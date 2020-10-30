const express = require('express');
const { body, validationResult } = require('express-validator');
const orderController = require('../controllers/orderController');
const orderRouter = express.Router();

orderRouter.post('/create', [body('name')], orderController.addOrder);
orderRouter.get('/getall', orderController.getOrders);

module.exports = orderRouter;
