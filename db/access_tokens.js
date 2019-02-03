'use strict';

const mysqlWrapper = require("./mysqlWrapper");
const xss = require("xss");

module.exports.find = (key, done) => {
  key = xss(key);
  mysqlWrapper.query(`SELECT * FROM access_tokens WHERE access_token='${key}';`, response => {
    if(response.results === null) {
        done(new Error("token not found"));
    }
    done(null, response.results[0]);
  });
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
  userId = xss(userId);
  clientId = xss(clientId);
  mysqlWrapper.query(`SELECT * FROM access_tokens WHERE user_id='${userId}' AND client_id='${clientId}';`, response => {
    if(response.results === null) {
        done(new Error("token not found"));
    }
    done(null, response.results[0]);
  });
};

module.exports.save = (token, userId, clientId, done) => {
  token = xss(token);
  userId = xss(userId);
  clientId = xss(clientId);
  mysqlWrapper.query(`INSERT INTO access_tokens (user_id, client_id, access_token) VALUES ('${userId}', '${client_id}', '${token}');`, response => {
      if(response.error) {
          done(new Error("Error inserting access token into db"));
      }
      done();
  })
};
