require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');

const app = new Koa();
const router = new Router();

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// server error handling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = '<html><body><h2>500 - Bugger!</h2><h3>Looks like we messed up!</h3><img src="https://media.giphy.com/media/xUA7aYAQ9Zvb35PUTS/giphy.gif" /><body></html>';
        ctx.app.emit('error', err, ctx);
    }
});

// x-respone-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logged in?
app.use(async (ctx, next) => {
    const safeUrls = ['/login', '/cook'];
    if (
        safeUrls.includes(ctx.url)
        || ctx.cookies.get('login', 'signed') === 'yeah'
    ) {
        await next();
    } else {
        ctx.redirect('/login');
    }
});


// routing
router.get('/', (ctx) => { ctx.redirect('/welcome'); });
router.get('/login', ctx => api.login(ctx));
router.get('/logout', ctx => api.logout(ctx));
router.get('/welcome', ctx => api.mainReq(ctx));
router.get('/cook', (ctx) => {
    ctx.cookies.set('login', 'yeah', { signed: true });
    ctx.body = 'you have a cookie?';
});
router.get('*', (ctx) => { ctx.body = 'sup?'; });

// app
app.use(router.routes());
app.keys = ['im a newer secret', 'i like turtle'];

/* eslint-disable no-console */
app.listen(1234, () => console.log('server listening on port 1234'));
