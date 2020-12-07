
/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          THIS WRITES 10,000,000 RANDOM NODES TO A CSV
          --------------------------------------------

  node --max-old-space-size=8192 database/neo4j/neo4jCsvWriter.js
                  ^  in the terminal  ^
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

let faker = require('faker');
const fs = require('fs');

console.log('Seeding neo4j.csv...');

// get images from S3, there are 20 named 0.jpg - 19.jpg
let numImgs = 20;
let s3Images = [];
for (let i = 0; i < numImgs; i++) {
  s3Images.push(`https://fec-related-items.s3-us-west-2.amazonaws.com/bars/${i}.jpg`);
}

/*      WRITER FUNCTIONS      */
const neo4jWrite = fs.createWriteStream('database/csv/neo4j.csv');
// WRITE THE HEADERS
neo4jWrite.write('product_id,name,rating,numRatings,prime,price,image1,image2,image3\n', 'utf8');

/*      LOOP OF DEATH      */
const batch = () => {
  let i = 1;
  while (i <= 10000000) {
    let document = {};
    document.product_id = i;
    document.name = faker.name.findName();
    document.rating = Math.floor(Math.random() * Math.floor(11));
    document.numRatings = faker.random.number();
    document.prime = faker.random.boolean();
    document.price = faker.commerce.price();
    document.image1 = s3Images[Math.floor(Math.random() * numImgs)];
    document.image2 = s3Images[Math.floor(Math.random() * numImgs)];
    document.image3 = s3Images[Math.floor(Math.random() * numImgs)];

    neo4jWrite.write(`${i},${document.name},${document.rating},${document.numRatings},${document.prime},${document.price},${document.image1},${document.image2},${document.image3}\n`,'utf8');

    i++;
  }
  console.log('finished writing');
}

batch();
