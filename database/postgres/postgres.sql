DROP DATABASE IF EXISTS related_Products;
CREATE DATABASE related_Products;
-- USE related_Products;
\c related_products
-- DROP TABLE product;
CREATE TABLE product (
    id SERIAL,
    name  VARCHAR (20) NOT NULL,
    rating VARCHAR (5) NOT NULL,
    numRatings VARCHAR (5) NOT NULL,
    prime VARCHAR (6) NOT NULL,
    price VARCHAR (10) NOT NULL,
    images VARCHAR (250) NOT NULL
);