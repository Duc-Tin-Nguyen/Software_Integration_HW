const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Create Item
router.post('/', itemController.createItem);

// Read Items
router.get('/', itemController.getItems);

// Update Item
router.put('/:id', itemController.updateItem);

// Delete Item
router.delete('/:id', itemController.deleteItem);

module.exports = router;
