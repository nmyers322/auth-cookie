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

// Returns a boolean: true if salt and password match hash value
function verifyPassword(password, salt, hash) {
    let saltBuffer = new Buffer(salt, 'hex');
    console.log(password);
    console.log(salt);
    console.log(hash);
    console.log(saltBuffer);
    console.log(passwordHasher.createHash(ALGORITHM, password, saltBuffer));
    console.log(passwordHasher.createHash(ALGORITHM, password, saltBuffer));
    console.log(passwordHasher.createHash(ALGORITHM, password, saltBuffer).hash.toString('hex'));
    return passwordHasher.createHash(ALGORITHM, password, saltBuffer).hash.toString('hex') === hash;
}

module.exports = {
    getSaltAndHashedPassword,
    verifyPassword
};