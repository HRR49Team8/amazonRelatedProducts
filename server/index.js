const bodyParser = require('body-parser');
const express = require('express');
const mongodb = require('../database/mongodb/mongodb.js');
const cassandra = require('../database/cassandra/cassandra.js');
const postgres = require('../database/postgres/postgres.js');
const faker = require('faker');

const app = express();
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/api/relatedProducts/all', (req, res) => {
  mongodb.find({})
  .then((data) => {
    if(!data) {
      throw data;
    } else {
      console.log('mongodb data accessed');
      res.status(200).send(data);
    }
  })
  .catch(() => {
    console.log('error in api call');
    res.send('error getting data');
  });
});

// app.get('/api/relatedProducts/all', (req, res) => {
//   if (req.query.database === 'mongodb') {
//     res.send('GET to mongodb');
//   } else if (req.query.database === 'mysql') {
//     res.send('GET to mysql');
//   } else {
//     res.send('GET to nowhere');
//   }
// });

app.post('/api/relatedProducts/all', (req, res) => {
  console.log(req.query)
  // MONGODB
  if (req.query.database === 'mongodb') {
    // Fake obj
    var obj = {
      name: 'bob',
      rating: Math.floor(Math.random() * Math.floor(11)),
      numRating: faker.random.number(),
      prime: faker.random.boolean(),
      price: faker.commerce.price(),
      images: 'https://fec-related-items.s3-us-west-2.amazonaws.com/bars/19.jpg',
    }

    mongodb.create(obj, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });

  // POSTGRES
  } else if (req.query.database === 'postgres') {
    res.send('POST to postgres');
  } else {
    res.send('POST to nowhere');
  }
})

app.put('/api/relatedProducts/all', (req, res) => {

  // MONGODB
  if (req.query.database === 'mongodb') {
    const query = {name: 'bob'};
    mongodb.findOne(query, (err, doc) => {
      if (err) {
        res.send(err);
      }
      doc.name = 'bobby'
      doc.save((err, result) => {
        if (err) {
          res.send(err);
        } else {
          console.log(result);
          res.send(result);
        }
      });
    })
  // POSTGRES
  } else if (req.query.database === 'postgres') {
    res.send('PUT to postgres');
  } else {
    res.send('PUT to nowhere');
  }
});

app.delete('/api/relatedProducts/all', (req, res) => {
  // MONGODB
  if (req.query.database === 'mongodb') {
    mongodb.deleteOne({ name: 'bobby' }, (err, result) => {
      err ? res.send(err) : res.send(result);
    });

  // POSTGRESS
  } else if (req.query.database === 'postgres') {
    res.send('DELETE to postgres');
  } else {
    res.send('DELETE to nowhere');
  }
});

let port = 3003;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
})
