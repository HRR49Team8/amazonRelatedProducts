const bodyParser = require('body-parser');
const express = require('express');
const mongodb = require('../database/mongodb/mongodb.js');
// const neo4j = require('../database/neo4j/neo4j.js');
const neoDriver = require('../database/neo4j/neo4jDriver.js');
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

  /*         NEO4J          */
  } else if (req.query.database === 'neo4j') {
    neoDriver.session
      .run('MATCH (p:product {product_id: $product_id}) RETURN p', {product_id: 10000001})
      .then(result => {
        result.records.forEach(record => {
          res.send(record._fields[0].properties);
        })
      })
      .catch((err) => console.log(err));

    // /*       Cypher Version - faster         */
    // neo4j.instance.cypher('MATCH (p:product {product_id: $product_id}) RETURN p', {product_id: 10000001})
    // .then(result => {
    //   // console.log(res)
    //   res.send(result.records[0]._fields[0].properties);
    // })
    // .catch((err) => console.log(err));

    /*       All Version - slower        */
    // neo4j.instance.all('product', {product_id: 10000001})
    // .then(collection => {
    //   let node = {
    //     name: collection.get(0).get('name'),
    //     product_id: collection.get(0).get('product_id'),
    //     rating: collection.get(0).get('rating'),
    //     numRatings: collection.get(0).get('numRatings'),
    //     prime: collection.get(0).get('prime'),
    //     price: collection.get(0).get('price'),
    //     images: collection.get(0).get('images'),
    //   };
    //   res.send(node); // 'bob'
    // })
    // .catch((err) => res.send(err));
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
    product_id: 10000001,
    rating: 5,
    numRatings: 706,
    prime: true,
    price: 427.00,
    images: ['https://fec-related-items.s3-us-west-2.amazonaws.com/bars/19.jpg', 'https://fec-related-items.s3-us-west-2.amazonaws.com/bars/19.jpg', 'https://fec-related-items.s3-us-west-2.amazonaws.com/bars/19.jpg'],
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

  /*        NEO4J       */
  } else if (req.query.database === 'neo4j') {
    neoDriver.session
      .run(`CREATE (p:product {name: $name, product_id: $product_id, rating: $rating, numRatings: $numRatings, prime: $prime, price: $price, images: $images}) RETURN p`, {
        name: obj.name,
        product_id: obj.product_id,
        rating: obj.rating,
        numRatings: obj.numRatings,
        prime: obj.prime,
        price: obj.price,
        images: obj.images,
      })
      .then(result => {
        res.send(result.records[0]._fields[0].properties);
      })
      .catch((err) => console.log(err));

    // neo4j.instance.create('product', {
    //   name: obj.name,
    //   product_id: obj.product_id,
    //   rating: obj.rating,
    //   numRatings: obj.numRatings,
    //   prime: obj.prime,
    //   price: obj.price,
    //   images: obj.images,
    // })
    // .then(item => {
    //   let node = {
    //     name: item.get('name'),
    //     product_id: item.get('product_id'),
    //     rating: item.get('rating'),
    //     numRatings: item.get('numRatings'),
    //     prime: item.get('prime'),
    //     price: item.get('price'),
    //     images: item.get('images'),
    //   };
    //   res.send(node)})
    // .catch(err => console.log(err));
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

  /*        NEO4J          */
  } else if (req.query.database === 'neo4j') {
    const newPrice = 12.00;
    neo4j.instance.cypher(`MATCH (p:product {product_id: $product_id}) SET p.price = ${newPrice} RETURN p`, {product_id: 10000001})
    .then(item => {
      res.send(item.records[0]._fields[0].properties);
      // let node = {
      //   name: item.get('name'),
      //   product_id: item.get('product_id'),
      //   rating: item.get('rating'),
      //   numRatings: item.get('numRatings'),
      //   prime: item.get('prime'),
      //   price: item.get('price'),
      //   images: item.get('images'),
      // };
      // res.send(node);
    })
    .catch((err) => console.error(err));
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
