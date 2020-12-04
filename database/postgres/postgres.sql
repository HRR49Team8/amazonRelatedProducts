DROP DATABASE IF EXISTS related_products;
CREATE DATABASE related_products;
-- USE related_Products;
\c related_products
-- DROP TABLE product;
CREATE TABLE product (
    product_id SERIAL,
    name  VARCHAR (40) NOT NULL,
    rating VARCHAR (5) NOT NULL,
    numRatings VARCHAR (5) NOT NULL,
    prime VARCHAR (6) NOT NULL,
    price VARCHAR (10) NOT NULL,
    PRIMARY KEY (product_id)
);

CREATE TABLE images (
    product_id INT,
    image1 VARCHAR (250) NOT NULL,
    image2 VARCHAR (250) NOT NULL,
    image3 VARCHAR (250) NOT NULL,
    FOREIGN KEY (product_id)
        REFERENCES product(product_id)
);

COPY product
FROM '/Users/matt/sdc/amazonRelatedProducts/database/csv/products.csv'
DELIMITER ',' CSV HEADER;

COPY images
FROM '/Users/matt/sdc/amazonRelatedProducts/database/csv/productsImages.csv'
DELIMITER ',' CSV HEADER;