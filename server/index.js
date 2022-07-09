const express = require('express');
const { PORT, CLIENT_URL } = require('./const/index');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors')
require('dotenv').config();



//import passport middleware
require('./middlewear/passport');


//initialize middlewears
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:3001", credentials: true }));
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
    app.listen(PORT, () =>{
        console.log(`The app is listening on http://localhost:${PORT}`)
    })
        } catch (error) {
    console.log(`Error: ${error.message}`)
    } 
}

appStart();