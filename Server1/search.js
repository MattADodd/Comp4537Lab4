document.getElementById("searchButton").addEventListener("click", function () {
    const word = document.getElementById("searchInput").value.trim();

    // Send the GET request to Server2 API
    fetch(`https://jellyfish-app-ea8bb.ondigitalocean.app/api/definitions/?word=${encodeURIComponent(word)}`)
        .then(response => response.json())
        .then(data => {
            if (data.definition) {
                document.getElementById("searchResult").innerText = `Definition: ${data.definition}`;
            } else {
                document.getElementById("searchResult").innerText = `Request #${data.requestCount}, word '${word}' not found!`;
            }
        })
        .catch(error => {
            document.getElementById("searchResult").innerText = "Error: " + error;
        });

    // Clear the search input field
    document.getElementById("searchInput").value = "";
});
