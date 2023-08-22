const express = require('express');

const router = express.Router();
const productcontroller = require('../controller/productcontroller')
const cartController = require('../controller/cartController')
const fileUpload = require('../middleware/multer')

router.post("/add-product",fileUpload.singleFileUpload, productcontroller.createProduct);

router.post("/add-product-image",fileUpload.singleFileUpload, productcontroller.createProductImages);

router.put("/update-product",productcontroller.updateProduct);

router.post("/get-all-product",productcontroller.getProducts)

router.post("/get-product-details-by-id",productcontroller.getProductDetailById)

router.put('/delete-product', productcontroller.deleteProduct);


// cart routes



router.post('/add-to-cart', cartController.addToCart);

router.post('/delete-from-cart', cartController.deleteFromCart);

router.get('/cart', cartController.getCart);





module.exports=router