const { Router } = require('express');
const { getCart, addItemToCart, deleteCart, updateCart } = require('../controllers/cart');
const cartRouter = Router();
const passport = require('passport');

cartRouter.get('/:customerId',  passport.authenticate('jwt', {session: false}), getCart)
cartRouter.post('/:customerId', passport.authenticate('jwt', {session: false}), addItemToCart)
cartRouter.delete('/:customerId/:cartId', passport.authenticate('jwt', {session: false}), deleteCart)
cartRouter.put('/:customerId/:cartId',passport.authenticate('jwt', {session: false}), updateCart)

module.exports = cartRouter;