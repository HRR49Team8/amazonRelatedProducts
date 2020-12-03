//https://node-postgres.com/
const { Client } = require('pg');

const postgres = new Client({
  host: 'localhost',
  user: 'matt',
  database: 'related_products'
});
postgres.connect();

const insertPostgres = () => {

};


module.exports = {
  postgres
};


