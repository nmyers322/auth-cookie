'use strict';

const mysqlWrapper = require("./mysqlWrapper");
const xss = require("xss");

module.exports.findById = (id, done) => {
  id = xss(id);
  console.log(`Querying users for id ${id}`);
  mysqlWrapper.queryForOneResult(`SELECT * FROM users WHERE id='${id}';`, response => {
    console.log("Result: ", response.result);
    if(response.result === null) {
        done(new Error("user not found"));
    }
    done(null, response.result);
  });
};

module.exports.findByUsername = (username, done) => {
  username = xss(username);
  console.log(`Querying users for username ${username}`);
  mysqlWrapper.queryForOneResult(`SELECT * FROM users WHERE username='${username}';`, response => {
    console.log("Result: ", response.result);
    if(response.result === null) {
        done(new Error("user not found"));
    }
    done(null, response.result);
  });
};
