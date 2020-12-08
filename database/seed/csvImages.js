const faker = require('faker');
const fs = require('fs');

console.log('seeding csv ...');

// get images from S3, there are 20 named 0.jpg - 19.jpg
let numImgs = 20;
let s3Images = [];
for (let i = 0; i < numImgs; i++) {
  s3Images.push(`https://fec-related-items.s3-us-west-2.amazonaws.com/bars/${i}.jpg`);
}
// CREATE PRODUCT WRITE
const imageWrite = fs.createWriteStream('database/csv/productsImages.csv');
// WRITE THE HEADERS
imageWrite.write('image1,image2,image3\n', 'utf8');
// WRITE THE DATA
for (let i = 1; i <= 10000000; i++) {
  var obj = {};
  obj.image1 = s3Images[Math.floor(Math.random() * numImgs)];
  obj.image2 = s3Images[Math.floor(Math.random() * numImgs)];
  obj.image3 = s3Images[Math.floor(Math.random() * numImgs)];
  let result = imageWrite.write(`${obj.image1},${obj.image2},${obj.image3}\n`,'utf8');
}

