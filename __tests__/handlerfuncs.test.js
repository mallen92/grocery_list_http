const httpHandlers = require('../src/handlerfuncs.js');
const groceryList = [{
    Item: "Bike",
    Price: 3.50,
    Quantity: 1,
    Purchased: true
}];

describe('GET testing', () => {
    test('getList() should return the items', () => {
        // Arrange: see groceryList array

        // Act
        const result = httpHandlers.getList(groceryList);
        const jsonResult = JSON.stringify(groceryList);

        // Assert
        expect(result).toBe(jsonResult);
    })
})

describe('POST testing', () => {
    test('createItem() should return true if the item was created', () => {
        // Arrange
        const itemToAdd = {
            Item: "Bike",
            Price: 140.99,
            Quantity: 4,
            Purchased: true
        };

        // Act
        const result = httpHandlers.createItem(itemToAdd, groceryList);

        // Assert
        expect(result).toBe(true);
    })
})

describe('PUT testing', () => {
    test('putItem() should return true if the specified item was updated', () => {
        // Arrange
        const itemUpdate = {
            Item: "Scooter",
            Price: 175.99,
            Quantity: 3,
            Purchased: true
        };

        // Act
        const result = httpHandlers.putItem(itemUpdate, 1, groceryList);

        // Assert
        expect(result).toBe(true);
    })
})

describe('DELETE testing', () => {
    test('deleteItem() should return true if the specified item was deleted', () => {
        // Arrange: see groceryList array

        // Act
        const result = httpHandlers.deleteItem(1, groceryList);

        // Assert
        expect(result).toBe(true);
    })
})