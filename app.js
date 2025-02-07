const http = require("http");
const port = 3000;
const urlModule = require("url");
const POST = 'POST';
const GET = 'GET';
const dictionary = [];
let count = 0;

class dictionaryListing {
    constructor(word, definition) {
        this.word = word;
        this.definition = definition;
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = urlModule.parse(req.url, true);
    const url = parsedUrl.pathname.replace(/\/$/, "");
    const query = parsedUrl.query;

    if (req.method === POST) {
        let body = "";
        count += 1;

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const parsedBody = JSON.parse(body);
            dictionary.push(new dictionaryListing(parsedBody.word.trim(), parsedBody.definition.trim()));

            res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
            res.end(JSON.stringify({ message: 'Data received', body: parsedBody }));
        });
    } else if (req.method === GET) {
        const word = query.word;
        const dListing = dictionary.find(item => item.word === word);

        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
        res.end(JSON.stringify( dListing || {error: "Word not found"}));
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
