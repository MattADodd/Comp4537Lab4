document.getElementById("storeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const word = document.getElementById("word").value.trim();
    const definition = document.getElementById("definition").value.trim();

    if (definition === "") {
        document.getElementById("response").innerText = "Definition cannot be empty.";
        return;
    }

    // Send the POST request to Server2
    fetch("https://jellyfish-app-ea8bb.ondigitalocean.app/dansucks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, definition }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerText = data.message;
    })
    .catch(error => {
        document.getElementById("response").innerText = "Error: " + error;
    });

    // Clear input fields after submission
    document.getElementById("word").value = "";
    document.getElementById("definition").value = "";
});