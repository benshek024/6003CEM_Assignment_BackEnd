const Koa = require('koa');
const app = new Koa();

const worker = require('./routes/workers.js')
const special = require('./routes/special')

app.use(special.routes())
app.use(worker.routes());

let port = process.env.PORT || 10888;

app.listen(port);
console.log('API is ready')