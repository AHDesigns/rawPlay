const https = require('https');
const bodyParser = require('body-parser');
const app = require('express')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function getData(params) {

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

const api = {
    async getRepos(res) {

        const params = {
            method: 'GET',
            host: 'api.github.com',
            path: '/orgs/octokit/repos',
            headers: {
                'user-agent': 'node.js'
            }
        };

        res.send(await getData(params));

    }
};

app.get('*', (req, res) => api.getRepos(res));

app.listen(1234, () => console.log('server listening on port 1234'));
