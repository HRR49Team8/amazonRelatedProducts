const neo4j = require('neo4j-driver')
const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'password'),
  { disableLosslessIntegers: true }
)

const session = driver.session({
  defaultAccessMode: neo4j.session.WRITE
})

module.exports = {
  session
}