DROP DATABASE IF EXISTS related_products;
CREATE DATABASE related_products;
-- USE related_Products;
\c related_products
-- DROP TABLE product;
CREATE TABLE product (
    name  VARCHAR (40) NOT NULL,
    rating VARCHAR (5) NOT NULL,
    numRatings VARCHAR (5) NOT NULL,
    prime VARCHAR (6) NOT NULL,
    price VARCHAR (10) NOT NULL,
    id SERIAL,
    PRIMARY KEY (id)
);

CREATE TABLE images (
    image1 VARCHAR (250) NOT NULL,
    image2 VARCHAR (250) NOT NULL,
    image3 VARCHAR (250) NOT NULL,
    id SERIAL,
    FOREIGN KEY (id)
        REFERENCES product(id)
);

COPY product(name,rating,numRatings,prime,price)
FROM '/Users/matt/sdc/amazonRelatedProducts/database/csv/products.csv'
DELIMITER ',' CSV HEADER;

COPY images(image1,image2,image3)
FROM '/Users/matt/sdc/amazonRelatedProducts/database/csv/productsImages.csv'
DELIMITER ',' CSV HEADER;