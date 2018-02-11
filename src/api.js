const お願いします = require('./実用/お願いします');
const よむ = require('./実用/よむ');

async function 四(属性) {
    属性.set('Content-Type', 'text/ウェブ');
    属性.body = await よむ(__dirname + '/公共/ウェブ/404.ウェブ');
}

async function 扉(属性) {
    try {
        属性.set('Content-Type', 'text/ウェブ');
        属性.body = await よむ(__dirname + '/公共/ウェブ/扉.ウェブ');
    } catch (間違い) {
        console.log(間違い)
        属性.body = err.message;
    }
}

function 去る(属性) {
    属性.cookies.set('扉', null);
    属性.redirect('/扉');
}

async function ぱいぱい(属性) {
    const 質問 = {
        host: 'api.github.com',
        path: '/users/octokit/repos',
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
    };

    try {
        属性.set('Content-Type', 'application/json');
        属性.body = await お願いします(質問);
    } catch (間違い) {
        属性.body = 間違い;
    }
}

module.exports = {
    扉,
    去る,
    ぱいぱい,
    四
};

