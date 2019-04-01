const crypto = require('crypto');

module.exports = {
    randomValueHex: len => crypto
        .randomBytes(Math.ceil(len / 2))
        .toString('hex')
        .slice(0, len)
};