const Router = require('koa-router');
const api = new Router();

api.get('/test', ctx => {
    ctx.body = 'test succeed';
});

//라우터 내보내기
module.exports = api;