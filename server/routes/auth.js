const { Router } = require('express');
const { validationMiddleware } = require('../middlewear/auth.middlewear');
const { registerValidations } = require('../validators/auth');
const authRouter = Router();
const { register } = require('../controllers/auth');

authRouter.post('/register', registerValidations, validationMiddleware, register);

module.exports = authRouter;