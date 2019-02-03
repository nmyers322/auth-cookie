'use strict';

const mysqlWrapper = require("./mysqlWrapper");
const xss = require("xss");

module.exports.find = (key, done) => {
  // if (codes[key]) return done(null, codes[key]);
  // return done(new Error('Code Not Found'));
  key = xss(key);
  mysqlWrapper.query(`SELECT * FROM authorization_codes WHERE authorization_code='${key}';`, response => {
    if(response.results === null) {
        done(new Error("code not found"));
    }
    done(null, JSON.parse(JSON.stringify(response.results[0])));
  });
};

module.exports.save = (code, clientId, redirectUri, userId, done) => {
  code = xss(code);
  clientId = xss(clientId);
  redirectUri = xss(redirectUri);
  userId = xss(userId);
  mysqlWrapper.query(`INSERT INTO authorization_codes (client_id, redirect_uri, user_id, authorization_code) VALUES ('${clientId}', '${redirectUri}', '${userId}', '${code}');`, response => {
      if(response.error) {
          done(new Error("code not inserted"));
      }
      done();
  });
};
