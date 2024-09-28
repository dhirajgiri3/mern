 const express = require('express');
 const router = express.Router();
 const { getAllProducts, createProduct, updateProduct, getProductById, deleteProduct } = require('../controller/productController');
 
 router.route('/products').get(getAllProducts);
 router.route('/products/new').post(createProduct);
 router.route('/products/:id').put(updateProduct);
 router.route('/products/:id').get(getProductById);
 router.route('/products/:id').delete(deleteProduct);
 
 module.exports = router;