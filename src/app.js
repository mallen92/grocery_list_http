const http = require('http');
const url = require('node:url');
const logger = require('./log.js');
const PORT = 8000;

// Define an array to store the shopping list
let shoppingList = [];

// Create a web server
const server = http.createServer((req, res) => {

    if(req.method === 'GET' && req.url == '/api/grocery') { getList(res); }
    else if(req.method === 'POST' && req.url == '/api/grocery') { createItem(req, res); }
    else if(req.method === 'PUT') { putItem(req, res); }
    else if(req.method === 'DELETE') { deleteItem(req, res) }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
        logger.error("Resource not found.");
    }

});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})

function getList(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = shoppingList;
    res.end(JSON.stringify(data));
}

function createItem(req, res) {
    let body = '';

    // Retreive the body from the HTTP requested
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        // Once the data has been received from the POST request, convert it into a JS object
        const newItem = JSON.parse(body);

        // Now that it's a JS object, add it to the shoppingList array.
        shoppingList.push(newItem);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Resource created successfully!'}));
        logger.info("Resource created successfully!");
    });
}

function putItem(req, res) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        const replacementItem = JSON.parse(body);
        
        // Returns the query string of the URL
        // This particular query string only has one parameter (e.g., id=1)
        const queryString = url.parse(req.url).query;

        // Split the query string along the = and place the resulting strings in an array
        const paramArray = queryString.split('=');

        // Convert the number value into an actual number.
        const itemNum = Number(paramArray[1]);

        // Replace the item at that index with the one sent in the body of the request
        shoppingList[itemNum-1] = replacementItem;

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: `Resource updated successfully!`}));
        logger.info("Resource updated successfully!");
    });
}

function deleteItem() {
    const queryString = url.parse(req.url).query;

    const paramArray = queryString.split('=');

    const itemNum = Number(paramArray[1]);

    // Remove the item of that index from the array.
    // If the client wants to delete item n, delete element n-1 from the array
    shoppingList.splice(itemNum-1, 1);

    res.writeHead(201, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: `Resource deleted successfully!`}));
    logger.info("Resource deleted successfully!");
}