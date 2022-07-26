const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors')
require('dotenv').config();
const path = require('path');
const helmet = require('helmet');
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
//import passport middleware
require('./middlewear/passport');

//initialize middlewears
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        scriptSrc: [ "'self'", "js.stripe.com", "https://checkout.stripe.com", "https://js.stripe.com","https://apis.google.com","https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "https://i.ibb.co", "https://*.stripe.com" ],
        frameSrc:  [" 'self '", "https://js.stripe.com", "js.stripe.com",  "https://checkout.stripe.com"],
        connectSrc: ["'self'","https://checkout.stripe.com","https://api.stripe.com"]
    },
    reportOnly: false,
  })
)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(origin = {origin:isProduction ? process.env.HEROKU_URL : process.env.CLIENT_URL, credentials: true }));
app.options('*', cors(origin));
app.use(passport.initialize());

//server static content
//npm run build 
if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "client/build")))
   
}
//import routes
const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

//initialize routes
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);

app.get('*',(req, res) =>{
    res.sendFile(path.join(__dirname,"client/build/index.html"));
})
const appStart = () => {
    try{
    app.listen(port, () =>{
        console.log(`The app is listening on ${port}`)
    })
        } catch (error) {
    console.log(`Error: ${error.message}`)
    } 
}

appStart();