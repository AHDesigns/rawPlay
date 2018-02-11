const fs = require('fs');

/* eslint-disable consistent-return */
function readFile(src) {
    return new Promise((resolve, reject) => {
        fs.readFile(src, { encoding: 'utf8' }, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

module.exports = readFile;
