const pool = require('../database/index');

exports.getCart = async (req, res) =>{
    const id = parseInt(req.params.customerId);
/*  
    if(req.user.id !== id && !req.user.is_admin) {
        return res.status(401).json({msg: "You are not authorized to see this Cart!"});
     }
     */  
    try {
     let results = await pool.query('SELECT size, sub_total, item_name, image_url, quantity  FROM cart AS c JOIN products AS p ON c.product_id = p.id WHERE c.customer_id = $1;', [id])
        if(!results.rows.length) {
            res.status(404).json({msg: "There is no cart with this customer_ID!"})
        } else {
            res.status(200).json(results.rows);
           
        }
    
} catch (error) {
    console.log(error);
}

}

exports.addItemToCart = async (req, res) =>{
    const id = parseInt(req.params.customerId);
/*
    if(!req.user.is_admin && !req.user.is_admin) {
       return res.status(401).json({msg: "You are not authorized to add to this Cart!"});
    }

    */
    const {product_id, size, quantity} = req.body;
    if(!product_id || !size || !quantity ) {
        return res.status(400).json({msg: "Pls give all informations correctly!"});
    }
    let results = await pool.query('SELECT * FROM cart WHERE customer_id=$1 AND size=$2 AND product_id=$3',[id, size, product_id]);
        if (results.rows.length) {
            return res.status(400).json({msg:"This item is already in your cart!"})
        } 
    //Getting the price of an item
    try {
     results = await pool.query('SELECT price FROM products WHERE id=$1', [product_id])

        if(!results.rows.length) {
            res.status(404).json({msg: "We couldn't get the price for this ID!"})
        } else {
            price = parseInt(results.rows[0].price);
            const sub_total = parseInt(quantity) * price;

            results = await pool.query('SELECT * FROM customers WHERE id = $1', [id])

                if(!results.rows.length) {
                    res.status(404).json({msg: "There is no customer with this customer_ID!"})
                } else {
                     results = await pool.query('INSERT INTO cart (customer_id, product_id, size, quantity, sub_total) VALUES ($1, $2, $3, $4, $5);'
                                                , [id, product_id, size, quantity, sub_total])
                        res.status(201).json({msg:"Item/items sucesfully added to your cart!"}) 
                }
        }
    } catch (error) {
        console.log(error);
    }
    
}