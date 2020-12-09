const faker = require('faker');
const fs = require('fs');

console.log('seeding csv ...');
const endPath = 'database/csv/productsImages.csv';

try {
  if (fs.existsSync(endPath)) {
    fs.unlinkSync(endPath);
    console.log('original file deleted');
  }
} catch(err) {
  console.error(err);
}

const randomNode = () => {
  // get images from S3, there are 20 named 0.jpg - 19.jpg
  let numImgs = 20;
  let s3Images = [];
  for (let i = 0; i < numImgs; i++) {
    s3Images.push(`https://fec-related-items.s3-us-west-2.amazonaws.com/bars/${i}.jpg`);
  }

  var obj = {};
  obj.image1 = s3Images[Math.floor(Math.random() * numImgs)];
  obj.image2 = s3Images[Math.floor(Math.random() * numImgs)];
  obj.image3 = s3Images[Math.floor(Math.random() * numImgs)];

  return obj;
}

// CREATE PRODUCT WRITE
const imageWrite = fs.createWriteStream(endPath);
// WRITE THE HEADERS
imageWrite.write('product_id,image\n', 'utf8');
// WRITE THE DATA
let i = 1;
(async() => {
  while (i <= 10000000) {
    const obj = randomNode();

    if (!imageWrite.write(`${i},${obj.image1}\n`,'utf8')) {
      await new Promise(resolve => imageWrite.once('drain', resolve))
    }
    if (!imageWrite.write(`${i},${obj.image2}\n`,'utf8')) {
      await new Promise(resolve => imageWrite.once('drain', resolve))
    }
    if (!imageWrite.write(`${i},${obj.image3}\n`,'utf8')) {
      await new Promise(resolve => imageWrite.once('drain', resolve))
    }
    if (i % 100000 === 0) {
      console.log(`${i} records written`)
    }
    i++
  }

})();

/*  node --max-old-space-size=1024 database/seed/csvImages.js  */