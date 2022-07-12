const { Router } = require('express');
const { getCart, addItemToCart, deleteCart, updateCart, checkOut, getCustomersOrders } = require('../controllers/cart');
const cartRouter = Router();
const passport = require('passport');

cartRouter.get('/:customerId',  passport.authenticate('jwt', {session: false}), getCart)
cartRouter.post('/:customerId', passport.authenticate('jwt', {session: false}), addItemToCart)
cartRouter.delete('/:customerId/:cartId', passport.authenticate('jwt', {session: false}), deleteCart)
cartRouter.put('/:customerId/:cartId',passport.authenticate('jwt', {session: false}), updateCart)
cartRouter.get('/checkout/:customerId', passport.authenticate('jwt', {session: false}), checkOut);
cartRouter.get('/orders/:customerId', passport.authenticate('jwt', {session: false}), getCustomersOrders);


module.exports = cartRouter;