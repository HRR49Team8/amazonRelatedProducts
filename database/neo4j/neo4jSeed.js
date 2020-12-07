let faker = require('faker');
const neo4j = require('./neo4j.js');

console.log('seeding neo4j db ...');

// get images from S3, there are 20 named 0.jpg - 19.jpg
let numImgs = 20;
let s3Images = [];
for (let i = 0; i < numImgs; i++) {
  s3Images.push(`https://fec-related-items.s3-us-west-2.amazonaws.com/bars/${i}.jpg`);
}

// QUERY FOR BATCHING
let query = 'CREATE (p:product {product_id: $product_id, name: $name, rating: $rating, numRatings: $numRatings, prime: $prime, price: $price, images: $images}) RETURN p';

const batch = () => {
  let seedData = [];
  let i = 1;
  while (i <= 100000) {
    let document = {};
    document.product_id = i;
    document.name = faker.name.findName();
    document.rating = Math.floor(Math.random() * Math.floor(11));
    document.numRatings = faker.random.number();
    document.prime = faker.random.boolean();
    document.price = faker.commerce.price();
    document.images = [];
    for (let j = 0; j < 3; j++){
      document.images.push(s3Images[Math.floor(Math.random() * numImgs)]);
    }
    seedData.push({query: query, params: document});
    i++;
  }
  console.log('finished loop');
  neo4j.instance.batch(seedData)
    .then(res => {
      console.log('loaded into neo4j');
      process.exit();
    })
    .catch(err => console.log(err));
}

batch();

/*
========================================================
      COMAND THAT RUNS THIS FOR 10000000 NODES
      ----------------------------------------

node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js && node --max-old-space-size=8192 database/neo4j/neo4jSeed.js
      ========================================================
      */