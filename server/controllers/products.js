const pool = require('../database/index');

exports.getAllProducts = (req, res) =>{
    
   
    pool.query('SELECT * FROM products', (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
 
}

exports.getProduct = async (req, res) =>{
    const id = req.params.productId;
    const results = await pool.query('SELECT * FROM products WHERE id = $1', [id]); 
        if(!results.rows.length) {
            res.status(404).json({msg: "We cant find a product with this ID!"});
        } else {
            res.status(200).json(results.rows[0]);
            
        }
    
}