const faker = require('faker');
const fs = require('fs');

console.log('seeding csv ...');
// CREATE PRODUCT WRITE
const productWrite = fs.createWriteStream('database/csv/products.csv');
// WRITE THE HEADERS
productWrite.write('product_id,name,rating,numRatings,prime,price\n', 'utf8');
// WRITE THE DATA
for (let i = 1; i <= 10000000; i++) {
  var obj = {};
  obj.name = faker.name.findName();
  obj.rating = Math.floor(Math.random() * Math.floor(11));
  obj.numRatings = faker.random.number();
  obj.prime = faker.random.boolean();
  obj.price = faker.commerce.price();
  productWrite.write(`${i},${obj.name},${obj.rating},${obj.numRatings},${obj.prime},${obj.price}\n`,'utf8');
}