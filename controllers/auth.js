const pool = require('../database/index');
const {hash } = require('bcryptjs');
const { SECRET } = require('../const/index');
const { sign } = require('jsonwebtoken')


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