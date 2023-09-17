const groceryListFileDAO = require('../src/groceryListFileDAO.js');
const fs = require('fs');

// The DAO will determine which database file is used for testing
const dbFile = groceryListFileDAO.dbFile;

const defaultArray = JSON.stringify([
    {
        "item": "Bike",
        "price": 799.99,
        "quantity": 1,
        "purchased": true
    }
]);

describe('Service test', () => {
    beforeEach(() => {
        fs.writeFileSync(dbFile, defaultArray);
    })

    test('getList() should return a grocery list object', () => {
        // Act
        const result = groceryListFileDAO.getList();

        // Assert
        expect(result).toEqual(JSON.parse(defaultArray));
    })

    test('createItem() should return true if the item was created', () => {
        // Arrange & Act
        const itemToAdd = '{"Item": "Cookies", "Price": 1.99, "Quantity": 2, "Purchased": true}';
        const result = groceryListFileDAO.createItem(itemToAdd);

        // Assert
        expect(result).toBe(true);
    })

    test('putItem() should return true if the specified item was updated', () => {
        // Arrange & Act
        const replacementItem = '{"Item": "Scooter", "Price": 49.99, "Quantity": 1, "Purchased": true}';
        const result = groceryListFileDAO.putItem(1, replacementItem);

        // Assert
        expect(result).toBe(true);
    })

    test('deleteItem() should return true if the specified item was deleted', () => {
        // Arrange & Act
        const result = groceryListFileDAO.deleteItem(1);

        // Assert
        expect(result).toBe(true);
    })
})