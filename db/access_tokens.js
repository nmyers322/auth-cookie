'use strict';

const mysqlWrapper = require("./mysqlWrapper");
const xss = require("xss");

module.exports.find = (key, done) => {
  key = xss(key);
  console.log(`Querying access_tokens for key ${key}`);
  mysqlWrapper.queryForOneResult(`SELECT * FROM access_tokens WHERE access_token='${key}';`, response => {
    console.log("Results: ", response.results);
    if(response.result === null) {
        done(new Error("token not found"));
    }
    done(null, response.result);
  });
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
  userId = xss(userId);
  clientId = xss(clientId);
  console.log(`Querying access_tokens for userId ${userId}, clientId ${clientId}`);
  mysqlWrapper.queryForOneResult(`SELECT * FROM access_tokens WHERE user_id='${userId}' AND client_id='${clientId}';`, response => {
    console.log("Results: ", response.results);
    if(response.result === null) {
        done(new Error("token not found"));
    }
    done(null, response.result);
  });
};

module.exports.save = (token, userId, clientId, done) => {
  token = xss(token);
  userId = xss(userId);
  clientId = xss(clientId);
  console.log(`Saving access_token ${token}, userId ${userId}, clientId ${clientId}`);
  mysqlWrapper.queryForOneResult(`INSERT INTO access_tokens (user_id, client_id, access_token) VALUES ('${userId}', '${clientId}', '${token}');`, response => {
      console.log("Result: ", response.result);
      if(response.error) {
          done(new Error("Error inserting access token into db"));
      }
      done();
  })
};
