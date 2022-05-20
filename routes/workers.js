const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/workers')
const auth = require('../controllers/auth');

const router = Router({prefix: '/api/v1/private/workers'})

router.get('/', auth, getAll)
router.post('/', bodyParser(), createWorker)
router.get('/:id([0-9]{1,})', getByID)
router.put('/:id([0-9]{1,})', updateWorker)
router.del('/:id([0-9]{1,})', deleteWorker)

async function getAll(ctx, next){
  let workers = await model.getAll()
  if (workers) {
    ctx.body = workers
  }
}

async function getByID(ctx){
  let id = ctx.params.id
  console.log(id)
  let worker = await model.getByID(id)
  if (worker.length){
    ctx.body = worker[0]
  }
}

async function createWorker(ctx){
  const body = ctx.request.body
  let result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  }
}

async function updateWorker(ctx){
  let id = ctx.params.id
  let updateWorker = ctx.request.body
  console.log(id)
  let worker = await model.update(id, updateWorker)
  if (worker){
    ctx.body = `The first worker with workerID ${id} updated`
  }
}

async function deleteWorker(ctx){
  let id = ctx.params.id
  console.log(id)
  let worker = await model.del(id)
  if (worker){
    ctx.body = `The first worker with workerID ${id} deleted`
  }
}
module.exports = router;