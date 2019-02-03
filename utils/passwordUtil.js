'use strict';

const SALT_LENGTH = 32;
const ALGORITHM = "ssha512";

const passwordHasher = require('password-hasher');

// Returns an object:
// {
//   alorithm: "ssha512",
//   salt: "generatedSaltBuffer",
//   hash: "generatedHashBuffer"
// }
function getSaltAndHashedPassword(password) {
    return passwordHasher.createHashAndSalt(ALGORITHM, password, SALT_LENGTH);
}

// Returns a boolean: true if hashed salt and password match hash value
function verifyPassword(password, salt, hash) {
    let saltBuffer = new Buffer(salt, 'hex');
    return passwordHasher.createHash(ALGORITHM, password, saltBuffer).hash.toString('hex') === hash;
}

module.exports = {
    getSaltAndHashedPassword,
    verifyPassword
};