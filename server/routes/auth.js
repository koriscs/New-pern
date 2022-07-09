const { Router } = require('express');
const { validationMiddleware } = require('../middlewear/auth.middlewear');
const { registerValidations ,loginValidation} = require('../validators/auth');
const authRouter = Router();
const { register, login, logout, account , loginGoogle} = require('../controllers/auth');
const passport = require('passport');

const REACT_URL = "http://localhost:3001/"

authRouter.post('/register', registerValidations, validationMiddleware, register);
authRouter.post('/login',loginValidation ,validationMiddleware, login);
authRouter.get('/logout', logout);
authRouter.get('/account' , passport.authenticate('jwt', {session: false}), account);

authRouter.get('/google', passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  }));
authRouter.get('/google/callback', passport.authenticate("google",
  { session: false }), loginGoogle);

authRouter.get('/google/success',passport.authenticate('jwt', {session: false}), (req, res) =>{
  if(req.user) {
  return res.status(200).json({succes: true , message: "Succes"});
  } else {
    return res.status(404).json({succes: false, message: "Sorry"});
  }
})



module.exports = authRouter;