const Koa = require('koa');
//const Router = require('koa-router');
const app = new Koa();
//const router = new Router();
//router.get('/api/v1', welcomeAPI);
const worker = require('./routes/workers.js')

app.use(worker.routes());

let port = process.env.PORT || 10888;

app.listen(port);
console.log('API is ready')