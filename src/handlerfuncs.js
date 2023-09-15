function getList(data) {
    const jsonData = JSON.stringify(data);
    return jsonData;
}

function createItem(body, groceryList) {
    const newItem = JSON.stringify(body);
    const currentItemCount = groceryList.length;
    const updatedItemCount = groceryList.push(newItem);

    return updatedItemCount === currentItemCount + 1;
}

function putItem(body, itemNum, groceryList) {
    const replacementItem = JSON.stringify(body);
            
    // Replace the item at that index with the one sent in the body of the request
    const currentItem = groceryList[itemNum-1];
    groceryList[itemNum-1] = replacementItem;

    return currentItem !== groceryList[itemNum-1];
}

function deleteItem(itemNum, groceryList) {
    // Remove the item of that index from the array.
    // If the client wants to delete item n, delete element n-1 from the array
    const currentItemCount = groceryList.length;
    groceryList.splice(itemNum-1, 1);
    const updatedItemCount = groceryList.length;

    return currentItemCount > updatedItemCount;
}

module.exports = { getList, createItem, putItem, deleteItem };