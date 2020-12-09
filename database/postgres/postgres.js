//https://node-postgres.com/
const { Client, Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  user: 'matt',
  database: 'related_products'
});

// STOPS A TRANSACTION IF IT RUNS INTO AN ERROR
const shouldAbort = (err) => {
  if (err) {
    console.error('Error in transaction', err.stack);
    client.query('ROLLBACK', (err) => {
      if (err) {
        console.error('Error rolling back client', err.stack);
      }
      done();
    });
  };
  return !!err;
};

const postgres = new Client({
  host: 'localhost',
  user: 'matt',
  database: 'related_products'
});
postgres.connect();

const selectPostgres = (callback) => {
  let results;
  const id = 100;
  const selectProduct = `SELECT * FROM product
                         WHERE id = $1`;
  const selectImages = `SELECT * FROM images
                        WHERE product_id = $1`;
  postgres.query(selectProduct, [id], (err, product) => {
    if (err) {
      callback(err.stack);
    } else {
      results = product.rows[0];
      results.images = [];
      postgres.query(selectImages, [id], (err, images) => {
        images.rows.map((i)=> {
          results.images.push(i.image)
        });
        /*  might remove later  */
        results.price = Number(results.price);

        const final = [results]
        callback(final)
      });
    }
  });
};

const insertPostgres = (product, images, callback) => {
  pool.connect((err, client, done) => {

    // BEGIN; QUERY
    client.query('BEGIN', (err, res) => {
      if (shouldAbort(err)) return

      // INSERT INTO products...
      const productQuery = 'INSERT INTO product(name, rating, numRatings, prime, price) VALUES($1, $2, $3, $4, $5) RETURNING id';
      client.query(productQuery, product, (err, res) => {
        if (shouldAbort(err)) return;

        // INSERT INTO images...
        const imageQuery = 'INSERT INTO images (image1, image2, image3,id) VALUES($1, $2, $3, $4)';
        const imagesValues = images.concat([res.rows[0].id]);
        client.query(imageQuery, imagesValues, (err, res) => {
          if (shouldAbort(err)) return;

          // COMMIT...
          client.query('COMMIT', (err) => {
            if (err) {
              callback('Error committing transaction' + err.stack)
            } else {
              callback(null, res);
            }
            done();
          });
        });
      });
    });
  });
};

const updatePostgres = (callback) => {
  const updateString = `UPDATE product SET price = 44 WHERE id > 10000000`;
  postgres.query(updateString, (err, result) => {
    err ? callback(err) : callback(null, result)
  })
}

const deletePostgres = (callback) => {
  pool.connect((err, client, done) => {

    // BEGIN; QUERY
    client.query('BEGIN', (err, res) => {
      if (shouldAbort(err)) return

      // DELETE IMAGES
      const deleteImages = `DELETE FROM images WHERE id > 10000000`;
      client.query(deleteImages, (err, res) => {
        if (shouldAbort(err)) return

        // DELETE PRODUCTS
        const deleteProduct = `DELETE FROM product WHERE id > 10000000`;
        client.query(deleteProduct, (err, res) => {
          if (shouldAbort(err)) return

          // COMMIT
          client.query('COMMIT', (err, res) => {
            if (err) {
              callback('Error committing transaction' + err.stack);
            } else {
              callback(null, res);
            }
            done();
          });
        });
      });
    });
  });
};


module.exports = {
  insertPostgres, deletePostgres, selectPostgres, updatePostgres
};


