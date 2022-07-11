const pool = require('../database/index');
const {hash } = require('bcryptjs');
const { SECRET } = require('../const/index');
const { sign } = require('jsonwebtoken')
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET)

exports.register = async (req, res) =>{
    const {email, password, firstname, lastname} = req.body;
    try {
        const hashedPassword = await hash(password, 10)

        await pool.query('INSERT INTO customers (first_name, last_name, password, email) values ($1, $2, $3, $4);',[firstname, lastname, hashedPassword, email])

        return res.status(201).json({sucess: true,
                                    message: "the registration was sucessfull!"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.login = async (req, res) =>{
    let user = req.user;

    let payload = {
        id: user.id,
        email: user.email
    }

    try {
        const token = sign(payload, SECRET)

        return res.status(200).cookie('token', token, {httpOnly: true, maxAge: 1000*60*60}).json({
            succes: true, 
            message: "Logged in sucesfully!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.account = async (req, res) =>{
    try {
        return res.status(200).json({
            id: req.user.id,
            email: req.user.email
        })
    } catch( error) {
        console.log(error.message)
    }
}

exports.logout = async (req, res) =>{
    try {
        return res.status(200).clearCookie('token', {httpOnly: true}).json({
            succes: true, 
            message: "Logged out sucesfully!"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
 }

 exports.loginGoogle = async (req, res) =>{
    let user = req.user
    let payload = {
        id: user.id,
        email: user.email
    }

    try {
        const token = sign(payload, SECRET)
        res.cookie('token', token, {httpOnly: true, maxAge: 1000*60*60})

        return res.status(200).redirect('http://localhost:3001/')

    } catch (error) {
        console.log(error.message)
    }
}
exports.postAddress = async (req, res) =>{
    const id = parseInt(req.params.customerId);
  
    const results = await pool.query('SELECT * FROM address WHERE customer_id = $1',[id])
    if(results.rows.length) {
        res.status(404).json({msg: "Sorry there is already an address to this account pls update if you want!"})
    } else {
        const {zipcode, country, city, street_name, street_number, mobile_number} = req.body;
    
        await pool.query('INSERT INTO address( customer_id, zipcode, country , city ,street_name , street_number, mobile_number) VALUES ($1, $2, $3, $4, $5, $6, $7);',
                        [id, zipcode, country, city, street_name, street_number, mobile_number])
                        res.status(201).json({msg: "Address infomrations sucesfully created"})
    }
    
}  

exports.getAddress = async (req, res) =>{
    const id = parseInt(req.params.customerId);
  
    

    const results = await pool.query('SELECT * FROM address WHERE customer_id = $1',[id])
        if(!results.rows.length) {
            res.status(404).json({msg: "We didn't find address information for this customer"})
        } else {
        res.status(200).json(results.rows);
        }
    }
exports.deleteAddress = async (req, res) =>{

    const id = parseInt(req.params.customerId);

    try{
    await pool.query('DELETE FROM address WHERE customer_id = $1;',[id]);
    return res.status(200).json({msg:"Your address was deleted"});
    } catch(error) {
        console.log(error);
    }
}

exports.stripePay = async (req, res) =>{
    let {amount, id } = req.body;
    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Clothes webshop",
            payment_method: id,
            confirm: true
        })
       // console.log("Payment", payment)
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
}

