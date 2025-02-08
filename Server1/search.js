// ChatGPT was used as help
// Import message constants for responses
const messages = require("../lang/messages/en/messages"); 

// Add event listener to the search button
document.getElementById("searchButton").addEventListener("click", function () {
  // Get the trimmed input value from the search box
  const word = document.getElementById("searchInput").value.trim();

  // Validate input: Ensure it's not empty and does not contain numbers
  if (!word || /\d/.test(word)) {
    document.getElementById("searchResult").innerText = messages.invalidInput;
    return;
  }

  // Make a GET request to the dictionary API with the searched word
  fetch(
    `https://jellyfish-app-ea8bb.ondigitalocean.app/api/definitions/?word=${encodeURIComponent(word)}`
  )
    .then((response) => response.json()) // Parse response as JSON
    .then((data) => {
      // Display the definition if found, otherwise show a "not found" message
      if (data.definition) {
        document.getElementById("searchResult").innerText = `Definition: ${data.definition}`;
      } else {
        document.getElementById("searchResult").innerText = `Request #${data.requests}, word '${word}' not found!`;
      }
    })
    .catch((error) => {
      // Handle network or server errors
      document.getElementById("searchResult").innerText = "Error: " + error;
    });

  // Clear the input field after submission
  document.getElementById("searchInput").value = "";
});
