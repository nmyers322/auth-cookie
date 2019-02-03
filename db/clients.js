'use strict';

const mysqlWrapper = require("./mysqlWrapper");
const xss = require("xss");

module.exports.findById = (id, done) => {
  id = xss(id);
  mysqlWrapper.query(`SELECT * FROM clients WHERE id='${id}';`, response => {
    if(response.results === null) {
        done(new Error("client not found"));
    }
    done(null, JSON.parse(JSON.stringify(response.results[0])));
  });
};

module.exports.findByClientId = (clientId, done) => {
  clientId = xss(clientId);
  mysqlWrapper.query(`SELECT * FROM clients WHERE client_id='${clientId}';`, response => {
    if(response.results === null) {
        done(new Error("client not found"));
    }
    done(null, JSON.parse(JSON.stringify(response.results[0])));
  });
};
