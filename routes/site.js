'use strict';

const passport = require('passport');
const login = require('connect-ensure-login');
const LocalStrategy = require('./passport-local').Strategy;
const db = require('../db');
const utils = require('../utils');

passport.use(new LocalStrategy(function(username, password, done) {
    console.log("Attempting to log in via /login");
    db.users.findByUsername(username, (error, user) => {
      if (error) return done(error);
      if (!user) return done(null, false);
      if (!utils.passwordUtil.verifyPassword(password, user.salt, user.password)) return done(null, false);
      // Everything validated, return the token
      const token = utils.getUid(256);
      db.accessTokens.save(token, user.id, client.client_id, (error) => {
        if (error) return done(error);
        return done(null, token);
      });
    });
}));

module.exports.index = (request, response) => response.send('OAuth 2.0 Server');

module.exports.loginForm = (request, response) => response.render('login');

module.exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' });

module.exports.logout = (request, response) => {
  request.logout();
  response.redirect('/');
};

module.exports.account = [
  login.ensureLoggedIn(),
  (request, response) => response.render('account', { user: request.user }),
];
