//https://node-postgres.com/
const { Client } = require('pg');

const postgres = new Client({
  host: 'localhost',
  user: 'matt',
  database: 'related_products'
});
postgres.connect();

const selectPostgres = (callback) => {
  const selectString = `SELECT * FROM product
                        WHERE product_id = 4`;
  postgres.query(selectString, (err, result) => {
    err ? callback(err.stack) : callback(result.rows[0]);
  });
};

const insertPostgres = (values, callback) => {
  const insertString = `INSERT INTO product(name, rating, numRatings, prime, price, images)
                       VALUES($1, $2, $3, $4, $5, $6)`
  postgres.query(insertString, values, (err, result) => {
    err ? callback(err.stack) : callback(result.rows[0]);
  });
};

const updatePostgres = (oldName, newName, callback) => {
  const updateString = `UPDATE product SET name = 'bobby'
                        WHERE id = (SELECT id FROM products WHERE name = 'bob')`;
  postgres.query(updateString, [oldName, newName], (err, result) => {
    err ? callback(err) : callback(result)
  })
}

const deletePostgres = (callback) => {
  const deleteString = `DELETE FROM product
                        WHERE id > 0`
  postgres.query(deleteString, (err, result) => {
    err ? callback(err) : callback(result);
  });
};


module.exports = {
  insertPostgres, deletePostgres, selectPostgres, updatePostgres
};


