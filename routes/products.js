const { Router } = require('express');
const productRouter = Router();
const { getAllProducts, getProduct } = require('../controllers/products');

productRouter.get('/', getAllProducts ,(req, res) =>{});
productRouter.get('/:productId', getProduct, (req, res) =>{});



module.exports = productRouter;

