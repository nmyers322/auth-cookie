'use strict';

const mysqlWrapper = require("./mysqlWrapper");
const xss = require("xss");

module.exports.find = (key, done) => {
  // if (codes[key]) return done(null, codes[key]);
  // return done(new Error('Code Not Found'));
  key = xss(key);
  console.log(`Querying authorization_codes for key ${key}`);
  mysqlWrapper.queryForOneResult(`SELECT * FROM authorization_codes WHERE authorization_code='${key}';`, response => {
    console.log("Result: ", response.result);
    if(response.result === null) {
        done(new Error("code not found"));
    }
    done(null, response.result);
  });
};

module.exports.save = (code, clientId, redirectUri, userId, done) => {
  code = xss(code);
  clientId = xss(clientId);
  redirectUri = xss(redirectUri);
  userId = xss(userId);
  console.log(`Saving authorization_code ${code}, clientId ${clientId}, redirectUri ${redirectUri}, userId ${userId}`);
  mysqlWrapper.queryForOneResult(`INSERT INTO authorization_codes (client_id, redirect_uri, user_id, authorization_code) VALUES ('${clientId}', '${redirectUri}', '${userId}', '${code}');`, response => {
      console.log("Result: ", response.result);
      if(response.error) {
          done(new Error("code not inserted"));
      }
      done();
  });
};
