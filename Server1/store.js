// ChatGPT was used as help
// Import message constants for responses
const messages = require("../lang/messages/en/messages");

// Add event listener to handle form submission
document.getElementById("storeForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the trimmed values of the word and its definition from input fields
    const word = document.getElementById("word").value.trim();
    const definition = document.getElementById("definition").value.trim();

    // Validate input: Ensure the definition is not empty
    if (definition === "") {
        document.getElementById("response").innerText = messages.definition;
        return;
    }

    // Send a POST request to Server2 to store the word-definition pair
    fetch("https://jellyfish-app-ea8bb.ondigitalocean.app/api/definitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set request headers
        body: JSON.stringify({ word, definition }), // Convert data to JSON format
    })
    .then(response => response.json()) // Parse response as JSON
    .then(data => {
        // Display server response message
        document.getElementById("response").innerText = data.message;
    })
    .catch(error => {
        // Handle network or server errors
        document.getElementById("response").innerText = "Error: " + error;
    });

    // Clear input fields after submission
    document.getElementById("word").value = "";
    document.getElementById("definition").value = "";
});