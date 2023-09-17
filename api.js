const http = require('http');
const url = require('node:url');
const groceryListFileDAO = require('./src/groceryListFileDAO.js');
const logger = require('./log.js');
const PORT = 8000;

// Create a web server
const server = http.createServer((req, res) => {

    if(req.method === 'GET' && req.url == '/api/grocery') {
        if (groceryListFileDAO.getList()) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(groceryListFileDAO.getList()));
        }
        else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('List retrieval unsuccessful.');
            logger.error("List retrieval unsuccessful.");
        }
    }
    else if(req.method === 'POST' && req.url == '/api/grocery') {
        let responseBody = '';

        // Retreive the body from the HTTP request
        req.on('data', (chunk) => {
            responseBody += chunk;
        });
    
        req.on('end', () => {
            if(groceryListFileDAO.createItem(responseBody)) {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end('Item created successfully!');
                logger.info("Item created successfully!");
            }
            else {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Item creation unsuccessful.');
                logger.error("Item creation unsuccessful.");
            }

        });
    }
    else if(req.method === 'PUT') {
        let responseBody = '';

        req.on('data', (chunk) => {
            responseBody += chunk;
        });
    
        req.on('end', () => {
            // Returns the query string of the URL
            // This particular query string only has one parameter (e.g., id=1)
            const queryString = url.parse(req.url).query;
    
            // Split the query string along the = and place the resulting strings in an array
            const paramArray = queryString.split('=');
    
            // Convert the number value into an actual number.
            const itemNum = Number(paramArray[1]);
    
            if(groceryListFileDAO.putItem(itemNum, responseBody))
            {
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end('Item updated successfully!');
                logger.info("Item updated successfully!");
            }
            else {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Item update unsuccessful.');
                logger.error("Item update unsuccessful.");
            }
    
        });
    }
    else if(req.method === 'DELETE') { 
        const queryString = url.parse(req.url).query;

        const paramArray = queryString.split('=');
    
        const itemNum = Number(paramArray[1]);
        
        if(groceryListFileDAO.deleteItem(itemNum)) {
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end('Item deleted successfully!');
            logger.info("Item deleted successfully!");
        }
        else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
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