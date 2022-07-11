const { check } = require('express-validator');
const pool = require('../database');
const { compare} = require('bcryptjs');

const password = check('password').isLength({min: 6, max: 15}).withMessage('Password has to be minimum 6 maximum 15 characters');

const email = check('email').isEmail().withMessage('Please give valid email address');

const emailExist = check('email').custom(async (value) =>{
    const { rows } = await pool.query('SELECT * FROM customers WHERE email =$1',[value])
    if (rows.length) {
        throw new Error ('Email already exists.')
    }
})

const firstname = check('firstname').not().isEmpty().withMessage('Please fill the firstname field')
const lastname = check('lastname').not().isEmpty().withMessage('Please fill the lastname field')


const loginFieldsCheck = check('email').custom(async (value, {req}) =>{
    const user = await pool.query('SELECT * FROM customers WHERE email =$1', [value])
    if (!user.rows.length) {
        throw new Error ('Email does not exists.');
    }
    console.log("User id: "+user.rows[0].id);
    const validPassword = await compare(req.body.password, user.rows[0].password)

    if(!validPassword) {
        throw new Error ('Wrong password!');
    }
    req.user = user.rows[0]
    })  
const zipcode = check('zipcode').isLength({min: 3, max: 10 }).withMessage('Zipcode has to be minimum 3 maximum 10 caracters!');
const country = check('country').not().isEmpty().withMessage('Please fill the Country field!');
const city = check('city').not().isEmpty().withMessage('Please fill the Country field!');
const street_name = check('street_name').not().isEmpty().withMessage('Please fill the Country field!');
const street_number = check('street_number').not().isEmpty().withMessage('Please fill the Country field!');
const mobile_number = check('mobile_number').not().isEmpty().isMobilePhone().withMessage('Please give a valid phone number!')

module.exports = {
    registerValidations: [email, password, emailExist,firstname, lastname],
    loginValidation: [password, loginFieldsCheck],
    addressValidation: [zipcode, country, city, street_name, street_number, mobile_number ]
}