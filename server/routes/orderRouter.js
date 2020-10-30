const express = require('express');
const orderController = require('../controllers/orderController');
const validator = require('../models/validator');
const orderRouter = express.Router();

orderRouter.post('/create', validator.addOrder, orderController.addOrder);
orderRouter.get('/getall', orderController.getOrders);

module.exports = orderRouter;
