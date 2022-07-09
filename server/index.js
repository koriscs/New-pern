const express = require('express');
const { PORT, CLIENT_URL, SERVER_URL } = require('./const/index');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors')
require('dotenv').config();
const helmet = require('helmet');
const isProduction = process.env.NODE_ENV === 'production';

//import passport middleware
require('./middlewear/passport');


//initialize middlewears
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({origin:isProduction ? process.env.HEROKU_URL : process.env.CLIENT_URL, credentials: true }));
app.options('*', cors(origin));
app.use(passport.initialize());

//import routes
const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

//initialize routes
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);


const appStart = () => {
    try{
    app.listen(isProduction ? process.env.HEROKU_URL : process.env.SERVER_URL, () =>{
        console.log(`The app is listening on ${isProduction ? process.env.HEROKU_URL : process.env.SERVER_URL}`)
    })
        } catch (error) {
    console.log(`Error: ${error.message}`)
    } 
}

appStart();