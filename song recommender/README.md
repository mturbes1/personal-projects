# Song Recommender

## Overview

The Song Recommender project is a web application that provides music recommendations based on a user's input song. The application uses a combination of Python (Flask) for the backend and JavaScript for the frontend, along with Spotipy to fetch album covers from Spotify.

## Features

- **Search and Autocomplete:** Users can search for songs, with autocomplete suggestions powered by a preloaded dataset.
- **Recommendations:** Based on the selected song, the app recommends similar songs using a machine learning model.
- **Album Covers:** Fetches album cover images from Spotify to enhance the visual experience.

## Technologies Used

- **Frontend:**
  - **HTML:** Structure and layout
  - **CSS:** Styling
  - **JavaScript:** Algorithm logic and visualization
- **Backend:**
  - **Python:** Flask framework for the server
  - **Spotipy:** Python library for accessing the Spotify Web API
  - **Scikit-Learn:** For similarity calculations

## Setup and Installation

1. **Clone the Repository:**

    git clone https://github.com/mturbes1/personal-projects.git

2. **Install Dependencies:**

    Create a virtual environment and install the required Python packages.

3. **Set Up Environment Variables:**

    Create a `.env` file in the root directory with the following content:

    CLIENT_ID=your_spotify_client_id
    CLIENT_SECRET=your_spotify_client_secret

4. **Run the Application:**

    Start the Flask server.

5. **Access the Application:**

    Go to given web url.

## Files

- **`song recommender.ipynb`** The jupyter notebook file showing the machine learning model.
- **`templates/index.html`**: The main HTML file for the frontend.
- **`static/styles.css`**: CSS file for styling the application.
- **`static/autocomplete.js`**: JavaScript file for handling search input and autocomplete functionality.
- **`app.py`**: Flask server file containing routes for autocomplete and recommendations.
- **`models/df.pkl`**: Pickle file containing the music dataset.
- **`models/similarity.pkl`**: Pickle file containing the similarity matrix.

## How It Works

1. **Search Input:** As the user types into the search bar, the application fetches autocomplete suggestions from the backend.
2. **Recommendation:** When a song is selected, the backend calculates similar songs using cosine similarity and returns recommendations.
3. **Album Covers:** The backend fetches album cover images from Spotify for the recommended songs.
