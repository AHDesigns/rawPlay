const https = require('https');

function request(params) {
    return new Promise((promRes) => {
        https.get(params, (res) => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', (data) => {
                // as stream comes in, append data to body
                body += data;
            });

            res.on('end', () => {
                // stream has finished, resolve promise
                promRes(body);
            });
        });
    });
}

module.exports = request;
