CREATE TABLE IF NOT EXISTS "customers" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar ,
  "last_name" varchar, 
  "password" varchar ,
  "email" varchar UNIQUE,
  "google_id" varchar(200),
  "is_admin" boolean 
);

CREATE TABLE IF NOT EXISTS "address" (
  "customer_id" int REFERENCES customers(id),
  "zipcode" int ,
  "country" varchar ,
  "city" varchar ,
  "street_name" varchar ,
  "street_number" varchar ,
  "mobile_number" int 
);

CREATE TABLE IF NOT EXISTS "products" (
  "id" SERIAL PRIMARY KEY,
  "item_name" varchar UNIQUE ,
  "description" text ,
  "image_url" varchar ,
  "price" float 
);

CREATE TABLE  IF NOT EXISTS cart(
id  SERIAL PRIMARY KEY,
customer_id int REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS cart_details (
cart_id int REFERENCES cart(id),
product_id int REFERENCES products(id),
size varchar(3) ,
quantity int ,
sub_total money,
UNIQUE(cart_id, product_id, size)
);

CREATE TABLE IF NOT EXISTS orders(
id  SERIAL PRIMARY KEY,
customer_id int REFERENCES customers(id),
customer_address text ,
date_of_purchase timestamp DEFAULT NOW(),
total_price money 
 );

 CREATE TABLE IF NOT EXISTS order_details (
   order_id int REFERENCES orders(id),
   product_name varchar ,
   product_size varchar(3) ,
   product_quantity int 
 );
 

SELECT size, sub_total, item_name, image_url, quantity  FROM cart AS c
JOIN products AS p
ON c.product_id = p.id
WHERE c.customer_id = 4;



