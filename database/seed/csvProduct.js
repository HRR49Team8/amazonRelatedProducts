const faker = require('faker');
const fs = require('fs');

console.log('seeding csv ...');

const endPath = 'database/csv/products.csv';

try {
  if (fs.existsSync(endPath)) {
    fs.unlinkSync(endPath);
    console.log('original file deleted');
  }
} catch(err) {
  console.error(err);
}

const randomNode = () => {
  let obj = {};
  obj.name = faker.name.findName();
  obj.rating = Math.floor(Math.random() * Math.floor(11));
  obj.numRatings = faker.random.number();
  obj.prime = faker.random.boolean();
  obj.price = faker.commerce.price();
  return obj;
}

// CREATE THE WRITE STREAM
const productWrite = fs.createWriteStream(endPath);

// WRITE THE HEADERS
productWrite.write('name,rating,numRatings,prime,price,\n', 'utf8');

// WRITE THE DATA
let i = 1;
(async() => {
  while (i <= 10000000) {
    // RANDOM NODE
    const obj = randomNode();

    if (!productWrite.write(`${obj.name},${obj.rating},${obj.numRatings},${obj.prime},${obj.price}\n`,'utf8')) {
      await new Promise(resolve => productWrite.once('drain', resolve))
    };
    if (i % 100000 === 0) {
      console.log(`${i} records written`)
    }
  }
})();

/*  node --max-old-space-size=1024 database/seed/csvProduct.js    */