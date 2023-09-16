const { http } = require('winston');
const httpHandlers = require('../src/handlerfuncs.js');
const testGroceryList = [{
    Item: "Bike",
    Price: 3.50,
    Quantity: 1,
    Purchased: true
}];

describe('GET testing', () => {
    test('getList() should return a JSON string containing the list of items', () => {
        // Arrange & Act
        const result = httpHandlers.getList(testGroceryList);

        // Assert
        expect(result).toBe(JSON.stringify(testGroceryList));
    })
})

describe('POST testing', () => {
    test('createItem() should return true if the item was created', () => {
        // Arrange & Act
        let testEmptyGroceryList = [];
        const itemToAdd = '{"Item": "Bike", "Price": 140.99, "Quantity": 4, "Purchased": true}';
        const result = httpHandlers.createItem(itemToAdd, testEmptyGroceryList);

        // Assert
        expect(result).toBe(true);
    })
})

describe('PUT testing', () => {
    test('putItem() should return true if the specified item was updated', () => {
        // Arrange & Act
        const replacementItem = '{"Item": "Scooter", "Price": 49.99, "Quantity": 1, "Purchased": true}';
        const result = httpHandlers.putItem(testGroceryList, 1, replacementItem);

        // Assert
        expect(result).toBe(true);
    })
})

describe('DELETE testing', () => {
    test('deleteItem() should return true if the specified item was deleted', () => {
        // Arrange & Act
        const result = httpHandlers.deleteItem(testGroceryList, 1);

        // Assert
        expect(result).toBe(true);
    })
})