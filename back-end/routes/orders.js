const express = require('express');
const router = express.Router();
const Order = require('../models/order');

//CREATE ORDER
router.post('/', async (req, res) => {
  try {
   
    const newOrder = new Order({
      shippingInfo: req.body.shippingInfo,
      orderItems: req.body.cartItems,
      user: req.body.user._id
    });
    const savedOrder = await newOrder.save();
    console.log(savedOrder)
    res.status(200).send(savedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET ALL PRODUCTS admin
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
