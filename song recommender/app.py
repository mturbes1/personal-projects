import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv
import os

#Get environment variables for API keys
load_dotenv()

#Keys for Spotify API
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

#Start flask application
app = Flask(__name__)

#Load models
music = pickle.load(open('models/df.pkl', 'rb'))
similarity = pickle.load(open('models/similarity.pkl', 'rb'))

client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

#Get album cover from spotify API using the song name and artist name
def get_song_album_cover_url(song_name, artist_name):
    search_query = f"track:{song_name} artist:{artist_name}"
    results = sp.search(q=search_query, type="track")

    if results and results["tracks"]["items"]:
        track = results["tracks"]["items"][0]
        album_cover_url = track["album"]["images"][0]["url"]
        print(album_cover_url)
        return album_cover_url
    else:
        return "https://i.postimg.cc/0QNxYz4V/social.png"

#Load home page 
@app.route('/')
def home():
    return render_template('index.html')

#Used for autocomplete the search bar based on the songs in the dataframe
@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('query', '')
    if query:
        matching_songs = music[music['track_name'].str.contains(f'^{query}', case=False, na=False)][['track_name', 'track_artist']].to_dict(orient='records')
    else:
        matching_songs = []
    return jsonify(matching_songs)

#Used to recommend songs based on the song inputed in the search bar
@app.route('/recommend', methods=['POST'])
def recommend():
    song_name = request.form['song_name']
    idx = music[music['track_name']==song_name]['id'].values[0]

    #Find the recommended songs based on the cosine similarities stored in similarity.pkl
    similar_songs = list(enumerate(similarity[idx]))
    distance = sorted(similar_songs, key=lambda x:x[1], reverse=True)
    
    recommendations = []
    for i in distance[1:9]:
        artist = music.iloc[i[0]].track_artist
        song = music.iloc[i[0]].track_name
        #Get album cover from the song name
        poster = get_song_album_cover_url(song, artist)
        recommendations.append({'song': song, 'poster': poster})

    return render_template('index.html', recommendations=recommendations, error=None)

if __name__ == "__main__":
    app.run(debug=True)


