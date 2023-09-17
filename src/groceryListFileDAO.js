const fs = require('fs');

// Production database file
//const dbFile = './database.json';

// Testing database file
const dbFile = './testdb.json';

function getList() { return JSON.parse(fs.readFileSync(dbFile)); }

function createItem(itemJsonString) {
    // Turn the JSON string parameter into an "new" item object so we can work with it
    const newGroceryItem = JSON.parse(itemJsonString);
    
    // Get list array from file
    const groceryList = getList();

    // Record the size of the list array, BEFORE the new item is added
    const currentGroceryListSize = groceryList.length;

    // Push the new item object onto the list array
    const updatedGroceryListSize = groceryList.push(newGroceryItem);

    writeToFile(groceryList);

    return updatedGroceryListSize === currentGroceryListSize + 1;
}

function putItem(itemNum, itemJsonString) {
    const replacementGroceryItem = JSON.parse(itemJsonString);
    
    // Get list array from file
    const groceryList = getList();

    // Record the current item object at the corresponding index
    const currentItem = groceryList[itemNum-1];

    // Replace the current item object with the replacement item object
    groceryList[itemNum-1] = replacementGroceryItem;

    writeToFile(groceryList);

    return currentItem !== groceryList[itemNum-1];
}

function deleteItem(itemNum) {
    
    // Get list array from file
    const groceryList = getList();

    const itemToDelete = groceryList[itemNum-1];
    
    // splice() returns an ARRAY of the items removed from the target array
    const deletedItemArray = groceryList.splice(itemNum-1, 1);

    writeToFile(groceryList);

    return itemToDelete === deletedItemArray[0];
}

function writeToFile(groceryList) {
    // Convert the modified list array into JSON for storage
    const jsonGroceryList = JSON.stringify(groceryList);

    // Overwrite the file with the new array
    fs.writeFileSync(dbFile, jsonGroceryList);
}

module.exports = { getList, createItem, putItem, deleteItem, dbFile };