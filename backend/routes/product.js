const express = require('express')
const router = express.Router()
const { isUserExist } = require('../middleWares/auth')
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.route('/products').get(isUserExist,getProducts)
router.route('/product/new').post(newProduct);
router.route('/admin/product/:id').get(getSingleProduct);
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);

module.exports = router
