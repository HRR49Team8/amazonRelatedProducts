const bodyParser = require('body-parser');
const express = require('express');
const mongodb = require('../database/mongodb/mongodb.js');
const neo4j = require('../database/neo4j/neo4j.js');
const postgres = require('../database/postgres/postgres.js');
const faker = require('faker');

const app = express();
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
===================================
  Original GET
===================================
*/

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

/*
===================================
  GET
===================================
*/

app.get('/api/relatedProducts', (req, res) => {
  /*        MONGODB       */
  if (req.query.database === 'mongodb') {
    res.send('GET to mongodb');

  /*        POSTGRES       */
  } else if (req.query.database === 'postgres') {
    postgres.selectPostgres((err, result) => {
      err ? res.send(err) : res.send(result);
    });
  } else {
    res.send('GET to nowhere');
  }
});

/*
===================================
  POST
===================================
*/

app.post('/api/relatedProducts', (req, res) => {
  /*        FAKE DATA       */
  var obj = {
    name: 'bob',
    rating: 5,
    numRatings: 706,
    prime: true,
    price: 427,
    images: 'https://fec-related-items.s3-us-west-2.amazonaws.com/bars/19.jpg',
  }
  var objArr = ['bob', 5, 706, true, 427, 'https://fec-related-items.s3-us-west-2.amazonaws.com/bars/19.jpg'];

  /*        MONGODB       */
  if (req.query.database === 'mongodb') {
    mongodb.create(obj, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });

  /*        POSTGRES       */
  } else if (req.query.database === 'postgres') {
    postgres.insertPostgres(objArr, (err, result) => {
      err ? res.send(err) : res.send(result);
    });
  } else {
    res.send('POST to nowhere');
  }
})

/*
===================================
  PUT
===================================
*/

app.put('/api/relatedProducts', (req, res) => {
  /*        MONGODB       */
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

  /*        POSTGRES       */
  } else if (req.query.database === 'postgres') {
    postgres.updatePostgres('bobby', 'bob', (err, result) => {
      err ? res.send(err) : res.send(result);
    })
  } else {
    res.send('PUT to nowhere');
  }
});

/*
===================================
  DELETE
===================================
*/

app.delete('/api/relatedProducts', (req, res) => {
  /*        MONGODB       */
  if (req.query.database === 'mongodb') {
    mongodb.deleteOne({ name: 'bobby' }, (err, result) => {
      err ? res.send(err) : res.send(result);
    });

  /*        POSTGRES       */
  } else if (req.query.database === 'postgres') {
    postgres.deletePostgres((err, result) => {
      err ? res.send(err) : res.send(result);
    });
  } else {
    res.send('DELETE to nowhere');
  }
});




let port = 3003;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
})
