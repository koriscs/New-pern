const pool = require('../database/index');

exports.getCart = async (req, res) =>{
    const id = parseInt(req.params.customerId);
 
    try {
     let results = await pool.query('SELECT size, sub_total, item_name, image_url, quantity, c.id AS cartId FROM cart AS c JOIN products AS p ON c.product_id = p.id WHERE c.customer_id = $1;', [id])
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

exports.deleteCart = async (req, res) =>{
    const cartId = parseInt(req.params.cartId); 

    
     let results = await pool.query('SELECT id, product_id FROM cart WHERE id = $1;', [cartId])
         if(!results.rows.length) {
             return res.status(404).json({msg: "We could not find a cart with this id!"})
         } else {
                 await pool.query('DELETE FROM cart WHERE id = $1;', [cartId])
                 return res.status(200).json({msg:"Your cart was deleted"});
             }
}

exports.updateCart = async (req, res) =>{
    const cartId =req.params.cartId;
    let { quantity } = req.body;
    quantity = parseInt(quantity);

    
    let results = await pool.query('SELECT id, product_id FROM cart WHERE id = $1;', [cartId])
        if(!results.rows.length) {
            res.status(404).json({msg: "We couldn't find a cart with this id"});
        } else {
            const product_id = results.rows[0].product_id;
            results = await pool.query('SELECT * FROM products WHERE id = $1', [product_id])
                  const price = parseInt(results.rows[0].price);
                 //console.log(price);
    
                const sub_total = quantity * price;
                await pool.query('UPDATE cart SET quantity = $1, sub_total = $2  WHERE id = $3;', [quantity, sub_total, cartId])
                res.status(200).json({msg: "The quantity was updated!"});
                
            }
}
        

exports.checkOut = async (req, res) =>{
    const id = parseInt(req.params.customerId);

   
     let results = await pool.query('SELECT * FROM cart WHERE customer_id = $1;', [id])
        if(!results.rows.length) {
            res.status(404).json({msg: "There is no cart with this customer_ID to checkout!"})
        } else {
           const order_array = results.rows;

           results = await pool.query('SELECT * FROM address WHERE customer_id = $1', [id])
                if(!results.rows.length) {
                    return res.status(404).json({msg: "There is no address information for this user pls give address information for the user first!"});
                } else {
                const addressObject = results.rows[0];
                const address = `${addressObject.zipcode}, ${addressObject.country} ${addressObject.city} ${addressObject.street_name} ${addressObject.street_number}.`;

                results = await pool.query('SELECT SUM(sub_total) as total_price FROM cart WHERE customer_id = $1;', [id])
                    const total_price = results.rows[0].total_price;

                    results = await pool.query('INSERT INTO orders (customer_id, customer_address, total_price) VALUES ($1, $2, $3) RETURNING id;', [id, address, total_price])
                        const order_id = results.rows[0].id;

                         order_array.forEach(order_item =>{
                             pool.query('INSERT INTO order_details (order_id, product_size, product_quantity, product_id) VALUES ($1, $2, $3, $4);',
                              [order_id, order_item.size, order_item.quantity, order_item.product_id])
                        })
                        await pool.query('DELETE FROM cart WHERE customer_id = $1;', [id])
                        res.status(200).json({msg:"Your order was sucesfully added!"})                        
                    
                
              }
                
              
        }
    
     
}
exports.getCustomersOrders =  async (req, res) =>{
    const id = req.params.customerId;

    const results = await pool.query('SELECT * FROM orders WHERE customer_id = $1;', [id])
        if(!results.rows.length) {
            return res.status(404).json({msg: "There is no order placed for this customer!"});
        } else {
           return res.status(200).json(results.rows);
        }

}