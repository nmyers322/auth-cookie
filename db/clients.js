'use strict';

const mysqlWrapper = require("./mysqlWrapper");
const xss = require("xss");

module.exports.findById = (id, done) => {
  id = xss(id);
  console.log(`Querying clients for id ${id}`);
  mysqlWrapper.queryForOneResult(`SELECT * FROM clients WHERE id='${id}';`, response => {
    console.log("Result: ", response.result);
    if(response.result === null) {
        done(new Error("client not found"));
    }
    done(null, response.result);
  });
};

module.exports.findByClientId = (clientId, done) => {
  clientId = xss(clientId);
  console.log(`Querying clients for clientId ${clientId}`);
  mysqlWrapper.queryForOneResult(`SELECT * FROM clients WHERE client_id='${clientId}';`, response => {
    console.log("Result: ", response.result);
    if(response.result === null) {
        done(new Error("client not found"));
    }
    done(null, response.result);
  });
};
