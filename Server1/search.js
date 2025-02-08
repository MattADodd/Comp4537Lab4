document.getElementById("searchButton").addEventListener("click", function () {
  const word = document.getElementById("searchInput").value.trim();

  if (!word || /\d/.test(word)) {
    document.getElementById("searchResult").innerText =
      "Invalid input. Please enter a valid word.";
    return;
  }

  fetch(
    `https://jellyfish-app-ea8bb.ondigitalocean.app/api/definitions/?word=${encodeURIComponent(
      word
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.definition) {
        document.getElementById(
          "searchResult"
        ).innerText = `Definition: ${data.definition}`;
      } else {
        document.getElementById(
          "searchResult"
        ).innerText = `Request #${data.requests}, word '${word}' not found!`;
      }
    })
    .catch((error) => {
      document.getElementById("searchResult").innerText = "Error: " + error;
    });

  document.getElementById("searchInput").value = "";
});
