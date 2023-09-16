function getList(groceryList) {
    // Turn the ShoppingList array (an object) into a JSON string
    const jsonGroceryList = JSON.stringify(groceryList);
    return jsonGroceryList;
}

function createItem(itemJsonString, groceryList) {
    const listSizeBeforeItemAdd = groceryList.length;
    
    // Convert the JSON string into a JavaScript object before adding it to the ShoppingList array
    const itemObject = JSON.parse(itemJsonString);
    const listSizeAfterItemAdd = groceryList.push(itemObject);

    return listSizeAfterItemAdd === listSizeBeforeItemAdd + 1;
}

function putItem(groceryList, itemNum, replacementItemJsonString) {
    const replacementItem = JSON.parse(replacementItemJsonString);
    
    // To compare and see if the item was actually replaced, store
    // the item in a variable before replacing it
    const currentItem = groceryList[itemNum-1];

    // Index = itemNum from the query string - 1
    // Replace the item at the index with the new item
    groceryList[itemNum-1] = replacementItem;

    return currentItem !== groceryList[itemNum-1];
}

function deleteItem(groceryList, itemNum) {
    
    const itemToDelete = groceryList[itemNum-1];
    
    // splice() returns an ARRAY of the items removed from the target array
    const deletedItem = groceryList.splice(itemNum-1, 1);

    return itemToDelete === deletedItem[0];
}

module.exports = { getList, createItem, putItem, deleteItem };