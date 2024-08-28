document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("songSearch");
    const suggestionsList = document.getElementById("suggestionsList");

    searchInput.addEventListener("input", function() {
        const query = searchInput.value;

        if (query.length >= 1) {
            fetch(`/autocomplete?query=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    suggestionsList.innerHTML = "";
                    data.forEach(item => {
                        const listItem = document.createElement("li");
                        listItem.textContent = `${item.track_name} by ${item.track_artist}`;
                        listItem.addEventListener("click", function() {
                            searchInput.value = item.track_name;
                            suggestionsList.innerHTML = "";
                        });
                        suggestionsList.appendChild(listItem);
                    });
                });
        } else {
            suggestionsList.innerHTML = "";
        }
    });

    document.addEventListener("click", function(event) {
        if (!suggestionsList.contains(event.target) && event.target !== searchInput) {
            suggestionsList.innerHTML = "";
        }
    });
});
