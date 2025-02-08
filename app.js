// Import required modules
const http = require("http"); // HTTP server module
const port = 3000; // Server port
const urlModule = require("url"); // URL module for parsing request URLs
const POST = 'POST'; // Constant for POST method
const GET = 'GET'; // Constant for GET method
const dictionaryListing = require("./modules/dictionarylisting"); // Import dictionaryListing class
const messages = require("./lang/messages/en/messages"); // Import message constants for responses
const dictionary = []; // Array to store dictionary listings
let count = 0; // Counter to track total requests

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Parse the request URL
    const parsedUrl = urlModule.parse(req.url, true);
    const url = parsedUrl.pathname.replace(/\/$/, ""); // Normalize the path by removing trailing slashes
    const query = parsedUrl.query; // Extract query parameters
    count += 1; // Increment request count

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(); // End the response
        return;
    }

    // Handle POST requests to add a new dictionary entry
    if (req.method === POST) {
        let body = "";

        // Accumulate incoming data chunks
        req.on('data', (chunk) => {
            body += chunk;
        });

        // Handle the end of data reception
        req.on('end', () => {
            const parsedBody = JSON.parse(body); // Parse the incoming JSON request body

            // Check if the word already exists in the dictionary
            for (listing of dictionary) {
                if (listing.word === parsedBody.word.trim()) {
                    res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
                    res.end(JSON.stringify({ message: messages.warning + listing.word + messages.noUpdate, words: dictionary.length, requests: count }));
                    return;
                }
            }

            // Add the new entry to the dictionary
            dictionary.push(new dictionaryListing(parsedBody.word.trim(), parsedBody.definition.trim()));

            // Send a success response
            res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
            res.end(JSON.stringify({ message: messages.received, words: dictionary.length, requests: count }));
        });

    // Handle GET requests to retrieve a dictionary entry
    } else if (req.method === GET) {
        const word = query.word; // Extract the word from the query
        const dListing = dictionary.find(item => item.word === word); // Search for the word in the dictionary

        // Send the dictionary entry or an error message if not found
        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
        res.end(JSON.stringify({ ...(dListing || { error: messages.notFound }), requests: count }));
    }
});

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
