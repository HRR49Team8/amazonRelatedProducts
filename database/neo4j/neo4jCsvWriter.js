/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          THIS WRITES 10,000,000 RANDOM NODES TO A CSV
          --------------------------------------------

          node database/neo4j/neo4jCsvWriter.js
                  ^  in the terminal  ^
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

let faker = require('faker');
const fs = require('fs');

console.log('Seeding neo4j.csv...');

const endPath = 'database/csv/neo4jRelated1.csv';

try {
  if (fs.existsSync(endPath)) {
    fs.unlinkSync(endPath);
    console.log('original file deleted');
  }
} catch(err) {
  console.error(err);
}

const createNode = () => {
  // get images from S3, there are 20 named 0.jpg - 19.jpg
  let numImgs = 20;
  let s3Images = [];
  for (let i = 0; i < numImgs; i++) {
    s3Images.push(`https://fec-related-items.s3-us-west-2.amazonaws.com/bars/${i}.jpg`);
  }

  let obj = {};
  obj.product_id = i;
  obj.name = faker.name.findName();
  obj.rating = Math.floor(Math.random() * Math.floor(11));
  obj.numRatings = faker.random.number();
  obj.prime = faker.random.boolean();
  obj.price = faker.commerce.price();
  obj.image1 = s3Images[Math.floor(Math.random() * numImgs)];
  obj.image2 = s3Images[Math.floor(Math.random() * numImgs)];
  obj.image3 = s3Images[Math.floor(Math.random() * numImgs)];
  return obj;
}


/*      WRITER FUNCTIONS      */
const neo4jWrite = fs.createWriteStream(endPath);
// WRITE THE HEADERS
neo4jWrite.write('id,name,rating,numRatings,prime,price,image,type\n', 'utf8');

/*      LOOP OF DEATH      */

  let i = 1;
  let type = 1;
  (async () => {
    while (i <= 1000000) {
      //RANDOM NODE
      const obj = createNode();
      if (!neo4jWrite.write(`${i},${obj.name},${obj.rating},${obj.numRatings},${obj.prime},${obj.price},${obj.image1}|${obj.image2}|${obj.image3},${type}\n`,'utf8')) {
        await new Promise(resolve => neo4jWrite.once('drain', resolve));
      }
      if (i % 10 === 0) {
        type++;
      }
      if(i % 1_000_000 === 0) {
        console.log(`${i} records written`)
      }
      i++;
    }
  })();

  console.log('finished writing');

/*  node database/neo4j/neo4jCsvWriter.js    */

