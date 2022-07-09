const { Router } = require('express');
const { getCart, addItemToCart } = require('../controllers/cart');
const cartRouter = Router();
const passport = require('passport');

cartRouter.get('/:customerId',  passport.authenticate('jwt', {session: false}),getCart)
cartRouter.post('/:customerId', passport.authenticate('jwt', {session: false}), addItemToCart)

module.exports = cartRouter;