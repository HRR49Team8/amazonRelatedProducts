
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RelatedProducts', {useNewUrlParser: true, useUnifiedTopology: true });

//ask how to drop and create a db via js
// (err, db) => {
//   if(err) {
//     throw err;
//   } else {
//     db.prototype.createCollection('products', (err, res) => {
//       if (err) {
//         throw err;
//       } else {
//         console.log('created mongo db collection');
//         db.close();
//       }
//     });
//   }
// });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});

  const productSchema = new mongoose.Schema({
    name:  String,
    rating: Number,
    numRatings: Number,
    prime: Boolean,
    price: Number,
    images: []
  });

// create a model from schema
const product = mongoose.model('products', productSchema);

module.exports = product;
