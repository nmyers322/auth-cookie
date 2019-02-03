'use strict';

const SALT_LENGTH = 32;
const ALGORITHM = "ssha512";

const passwordHasher = require('password-hasher');

// Returns an object:
// {
//   alorithm: "ssha512",
//   salt: "generatedSalt",
//   hash: "generatedHash"
// }
function getSaltAndHashedPassword(password) {
    return passwordHasher.createHashAndSalt(ALGORITHM, password, SALT_LENGTH);
}

// Returns a boolean: true if salt and password match hash value
function verifyPassword(password, salt, hash) {
    return passwordHasher.createHash(ALGORITHM, password, salt) === hash;
}

module.exports = {
    getSaltAndHashedPassword,
    verifyPassword
};