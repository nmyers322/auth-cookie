'use strict';

const mySql = require('mysql');

// Create and return the connection to the db
function initConnection() {
  // Set the global connection object
   return mySql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
}

/**
 * Executes the specified sql query and provides a callback which is given
 * with the results in a DataResponseObject
 *
 * @param queryString
 * @param callback - takes a DataResponseObject
 */
function query(queryString, callback){
  let connection = initConnection();
  connection.connect();
  connection.query(queryString, function(error, results, fields){
    console.log('mySql: query: error is: ', error, ' and results are: ', results);
    connection.end();
    // error is a boolean
    // results can be undefined, null, or the query results
    callback({
      error,
      results: results === undefined ? null : results === null ? null : results
    });
  });
}

module.exports = { query: query };
