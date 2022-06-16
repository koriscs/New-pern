const pool = require('../database/index');
const {hash } = require('bcryptjs');


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