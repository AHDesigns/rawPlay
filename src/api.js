const request = require('./middleware/request');
const readFile = require('./middleware/readFile');

async function senosen(ctx) {
    ctx.set('Content-Type', 'text/html');
    ctx.body = await readFile(`${__dirname}/public/html/404.html`);
}

async function login(ctx) {
    try {
        ctx.set('Content-Type', 'text/html');
        ctx.body = await readFile(`${__dirname}/public/html/login.html`);
    } catch (err) {
        /* handle error */
        console.log(err)
        ctx.body = err.message;
    }
}

function logout(ctx) {
    ctx.cookies.set('login', null);
    ctx.redirect('/login');
}

async function mainReq(ctx) {
    const params = {
        host: 'api.github.com',
        path: '/users/octokit/repos',
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
    };

    try {
        ctx.set('Content-Type', 'application/json');
        ctx.body = await request(params);
    } catch (e) {
        /* handle error */
        ctx.body = e;
    }
}

module.exports = {
    login,
    logout,
    mainReq,
    senosen
};

