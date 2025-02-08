const http = require("http");
const port = 3000;
const urlModule = require("url");
const POST = 'POST';
const GET = 'GET';
const dictionaryListing = require("./modules/dictionarylisting")
const messages = require("./lang/messages/en/messages")
const dictionary = [];
let count = 0;

const server = http.createServer((req, res) => {
    const parsedUrl = urlModule.parse(req.url, true);
    const url = parsedUrl.pathname.replace(/\/$/, "");
    const query = parsedUrl.query;
    count += 1;

    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    if (req.method === POST) {
        let body = "";

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const parsedBody = JSON.parse(body);

            for (listing of dictionary) {
                if (listing.word === parsedBody.word.trim()){
                    res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
                    res.end(JSON.stringify({ message: messages.warning + listing.word + messages.noUpdate, words: dictionary.length, requests: count }));
                    return;
                }
            }

            dictionary.push(new dictionaryListing(parsedBody.word.trim(), parsedBody.definition.trim()));

            res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
            res.end(JSON.stringify({ message: messages.received, words: dictionary.length, requests: count }));
        });
    } else if (req.method === GET) {
        const word = query.word;
        const dListing = dictionary.find(item => item.word === word);

        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*" });
        res.end(JSON.stringify({ ...(dListing || { error: messages.notFound }), requests: count }));
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
