const http = require("http");
const port = 3000;
const urlModule = require("url");
const POST = 'POST';
const GET = 'GET';
const dictionary = []
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

        const parsedBody = body.replace(/([^:]*:)(.*)/, "$1|$2").split("|");
        dictionary.push(new dictionaryListing(parsedBody[0], parsedBody[1]));

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
            res.end(JSON.stringify({ message: 'Data received', body: body }));
        });
    } else if (req.method === GET) {
        let body = "";
        count += 1;

        req.on('data', (chunk) => {
            body += chunk;
        });

        let dListing;
        for (listing in dictionary) {
            if (listing.word === body) {
                dListing = listing;
                break;
            }
        }

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
            res.end(JSON.stringify({ dListing }));
        });
    }
});

server.listen(port , () => {
    console.log(`Server running at http://localhost:${port}/`);
});