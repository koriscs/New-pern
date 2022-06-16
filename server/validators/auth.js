const { check } = require('express-validator');
const pool = require('../database');
const { compare} = require('bcryptjs');

const password = check('password').isLength({min: 6, max: 15}).withMessage('Password has to be minimum 6 maximum 15 characters')

const email = check('email').isEmail().withMessage('Please give valid email address');

const emailExist = check('email').custom(async (value) =>{
    const { rows } = await pool.query('SELECT * FROM customers WHERE email =$1',[value])
    if (rows.length) {
        throw new Error ('Email already exists.')
    }
})

const firstname = check('firstname').not().isEmpty().withMessage('Please fill the firstname field')
const lastname = check('lastname').not().isEmpty().withMessage('Please fill the lastname field')

module.exports = {
    registerValidations: [email, password, emailExist,firstname, lastname],
}