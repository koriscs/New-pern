E-commerce webshop
=========

# General Information
Made this website as final project for CodeCademy Fullstack-Engineer path.
It's a functional webshop with the following perks:

+ You can login with local credentials or using Google
+ You can add products to your cart without login
+ You can change size or quantity
+ Crating orders and paying via Stripe

# Technologies

+ PostgreSQL
+ Express
+ Node
+ React
+ Using Redux Persist store for storeing Cart in localstorage
+ Using Passport.js/Cookies for authorization
+ Bootstrap for easier CSS
+ Using proxy

# Running Locally

There is an exampleENV.txt to help you create your own .env .I also changed 3 things for production that i was lazy to configure for local use

1. Middlewear/passport.js CallbackURL in Google-strategy
2. Database index.js have to comment out ssl: {}
3. client/src/pages/Login.jsx change the window.open url to your server url

After these the Database structure and products can be found in database folder.
In root folder npm run dev and /client folder npm run start.
