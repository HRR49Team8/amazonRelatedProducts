DROP DATABASE IF EXISTS related_products;
-- CREATE DATABASE related_products;
-- -- USE related_Products;
-- \c related_products
-- -- DROP TABLE product;
-- CREATE TABLE product (
--     name  VARCHAR (40) NOT NULL,
--     rating VARCHAR (5) NOT NULL,
--     numRatings VARCHAR (5) NOT NULL,
--     prime VARCHAR (6) NOT NULL,
--     price VARCHAR (10) NOT NULL,
--     id SERIAL,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE images (
--     product_id INT NOT NULL,
--     image VARCHAR (250) NOT NULL,
--     id SERIAL,
--     PRIMARY KEY (id),
--     FOREIGN KEY (product_id)
--         REFERENCES product(id)
-- );

-- COPY product(name,rating,numRatings,prime,price)
-- FROM '/Users/matt/sdc/amazonRelatedProducts/database/csv/products.csv'
-- DELIMITER ',' CSV HEADER;

-- COPY images(product_id,image)
-- FROM '/Users/matt/sdc/amazonRelatedProducts/database/csv/productsImages.csv'
-- DELIMITER ',' CSV HEADER;

-- CREATE INDEX ON images (product_id);

-- -- psql postgres < database/postgres/postgres.sql
-- -- psql related_products