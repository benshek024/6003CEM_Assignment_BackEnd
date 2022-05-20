const Koa = require('koa');
const app = new Koa();

const dogs = require('./routes/dogs.js')
const worker = require('./routes/workers.js')
const special = require('./routes/special')

app.use(dogs.routes());
app.use(special.routes());
app.use(worker.routes());

let port = process.env.PORT || 10888;

app.listen(port);
console.log('API is ready')