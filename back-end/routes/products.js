const express = require('express');
const cloudinary = require('../utils/cloudinary');
const router = express.Router();
const Product = require('../models/product');
const { isAdmin } = require('../middleware/auth');
const ApiFeatures = require('../utils/ApiFeatures');

//CREATE PRODUCT
router.post('/', isAdmin, async (req, res) => {
  const { name, brand, desc, price, image, stock } = req.body;
  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: 'onlineShop',
      });

      if (uploadRes) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          stock,
          image: uploadRes,
        });
        const savedProduct = await product.save();

        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const resultPerPage = 16;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .pagination(resultPerPage);
    let products = await apiFeature.query;

   
    res.status(200).send({
      products,
      productsCount,
      resultPerPage,
     
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET ALL PRODUCTS admin
router.get('/admin', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET PRODUCT
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send('Product has been deleted...');
  } catch (error) {
    res.status(500).send(error);
  }
});
//UPDATE
router.put('/:id', isAdmin, async (req, res) => {
  const { name, price, brand, stock, desc, image } = req.body;

  try {
    const uploadRes = await cloudinary.uploader.upload(image, {
      upload_preset: 'onlineShop',
    });
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        brand,
        stock,
        desc,
        image: uploadRes,
      },
      { new: true }
    );

    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
