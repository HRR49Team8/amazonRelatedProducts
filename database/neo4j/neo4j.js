// https://www.npmjs.com/package/neo4j-driver
// var neo4j = require('neo4j-driver')
// const driver = neo4j.driver(
//   'bolt://localhost:7687',
//   neo4j.auth.basic('neo4j', 'password')
// )

// const session = driver.session({
//   database: 'RelatedProducts',
//   defaultAccessMode: neo4j.session.WRITE
// })


//https://github.com/adam-cowley/neode
const Neode = require('neode');
const instance = new Neode('bolt://localhost:7687', 'neo4j', 'password');

// SCHEMA FOR NEO4J
instance.model('product', {
  product_id: {
    primary: true,
    type: 'number',
  },
  name: {
    type: 'name',
  },
  rating: {
    type: 'number',
  },
  numRatings: {
    type: 'number',
  },
  prime: {
    type: 'boolean',
  },
  price: {
    type: 'number',
  },
  images: {
    type: 'array',
  },
})

const batching = (arr) => {
  instance.batch(arr)
  .then(res => {
    console.log('loaded into neo4j');
  })
  .catch(err => console.log(err));
};



module.exports = {
  batching, instance
};
