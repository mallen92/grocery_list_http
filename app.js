const http = require('http');
const url = require('node:url');
const httpHandlers = require('./src/handlerfuncs.js');
const logger = require('./log.js');
const PORT = 8000;

// Define an array to store the shopping list
let shoppingList = [];

// Create a web server
const server = http.createServer((req, res) => {

    if(req.method === 'GET' && req.url == '/api/grocery') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(httpHandlers.getList(shoppingList));
    }
    else if(req.method === 'POST' && req.url == '/api/grocery') {
        let body = '';

        // Retreive the body from the HTTP requested
        req.on('data', (chunk) => {
            body += chunk;
        });
    
        req.on('end', () => {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            if(httpHandlers.createItem(body, shoppingList)) {
                res.end('Item created successfully!');
                logger.info("Item created successfully!");
            }
            else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Item creation unsuccessful.');
                logger.error("Item creation unsuccessful.");
            }

        });
    }
    else if(req.method === 'PUT') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });
    
        req.on('end', () => {
            // Returns the query string of the URL
            // This particular query string only has one parameter (e.g., id=1)
            const queryString = url.parse(req.url).query;
    
            // Split the query string along the = and place the resulting strings in an array
            const paramArray = queryString.split('=');
    
            // Convert the number value into an actual number.
            const itemNum = Number(paramArray[1]);
    
            if(httpHandlers.putItem(body, itemNum, shoppingList))
            {
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end('Item updated successfully!');
                logger.info("Item updated successfully!");
            }
            else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Item update unsuccessful.');
                logger.error("Item update unsuccessful.");
            }
    
        });
    }
    else if(req.method === 'DELETE') { 
        const queryString = url.parse(req.url).query;

        const paramArray = queryString.split('=');
    
        const itemNum = Number(paramArray[1]);
        
        if(httpHandlers.deleteItem(itemNum, shoppingList)) {
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end('Item deleted successfully!');
            logger.info("Item deleted successfully!");
        }
        else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Item deletion unsuccessful.');
            logger.error("Item deletion unsuccessful.");
        }
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
        logger.error("Resource not found.");
    }

});

server.listen(8000, () => {
    console.log(`Server listening on port ${PORT}`);
})
