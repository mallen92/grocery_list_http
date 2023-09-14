const http = require('http');
const url = require('node:url');
const { createLogger, transports, format } = require('winston');
const PORT = 8000;

// Create a logger
const logger = createLogger({
    level: 'info', // this will log only messages with the level 'info' and above
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // log to the console
        new transports.File({ filename: 'app.log'}), // log to a file
    ]
})

// Define an array to store the shopping list
let shoppingList = [];

// Create a web server
const server = http.createServer((req, res) => {

    // GET - view the grocery list
    if(req.method === 'GET' && req.url == '/api/grocery') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const data = shoppingList;
        res.end(JSON.stringify(data));
    }

    // POST - add item to the grocery list
    else if(req.method === 'POST' && req.url == '/api/grocery') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            // Once the data has been received from the POST request, convert it into a JS object
            const data = JSON.parse(body);

            // Now that it's a JS object, add it to the shoppingList array.
            shoppingList.push(data);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'Resource created successfully!'}));
            logger.info("Resource created successfully!");
        });
    }

    // PUT - edit a grocery list item
    else if(req.method === 'PUT') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            // Once the data has been received from the PUT request, convert it into a JS object
            const data = JSON.parse(body);

            // Now that it's a JS object, update the old shopping list with the new list
            shoppingList = [data];

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'Resource updated successfully!'}));
            logger.info("Resource updated successfully!");
        });
    }

    // DELETE - delete a grocery list item
    else if(req.method === 'DELETE') {
        // Returns the query string of the URL
        // This particular query string only has one parameter (e.g., id=1)
        const queryString = url.parse(req.url).query;

        // Split the query string along the = and place the resulting strings in an array
        const paramArray = queryString.split('=');

        // Convert the number value into an actual number.
        const itemNum = Number(paramArray[1]);

        // Remove the item of that index from the array.
        // If the client wants to delete item n, delete element n-1 from the array
        const deletedItem = shoppingList.splice(itemNum-1, 1);

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: `Resource Deleted Successfully!`}));
        logger.info("Resource deleted successfully!");
    }

    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
        logger.error("Resource not found.");
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})