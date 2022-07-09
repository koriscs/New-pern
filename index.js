const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors')
require('dotenv').config();
const helmet = require('helmet');
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

//import passport middleware
require('./server/middlewear/passport');


//initialize middlewears
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(origin = {origin:isProduction ? process.env.HEROKU_URL : process.env.CLIENT_URL, credentials: true }));
app.options('*', cors(origin));
app.use(passport.initialize());

//import routes
const authRouter = require('./server/routes/auth');
const productRouter = require('./server/routes/products');
const cartRouter = require('./server/routes/cart');

//initialize routes

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);


const appStart = () => {
    try{
    app.listen(port, () =>{
        console.log(`The app is listening on ${port}`)
    })
        } catch (error) {
    console.log(`Error: ${error.message}`)
    } 
}
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
    error: {
    status: error.status || 500,
    message: error.message || 'Internal Server Error',
    },
  });
  })
appStart();