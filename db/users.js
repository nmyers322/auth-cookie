'use strict';

const mysqlWrapper = require("./mysqlWrapper");
const xss = require("xss");

module.exports.findById = (id, done) => {
  id = xss(id);
  mysqlWrapper.query(`SELECT * FROM users WHERE id='${id};`, response => {
    if(response.results === null) {
        done(new Error("user not found"));
    }
    done(null, response.results[0]);
  });
};

module.exports.findByUsername = (username, done) => {
  username = xss(username);
  mysqlWrapper.query(`SELECT * FROM users WHERE username='${username};`, response => {
    if(response.results === null) {
        done(new Error("user not found"));
    }
    done(null, response.results[0]);
  });
};
