// https://www.npmjs.com/package/neo4j-driver
var neo4j = require('neo4j-driver')

var driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'password')
)

var session = driver.session({
  database: 'Related Products',
  defaultAccessMode: neo4j.session.WRITE
})



module.exports = {

};
