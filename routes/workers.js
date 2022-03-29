const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/workers')

const router = Router({prefix: '/api/v1/workers'})

router.get('/', getAll)
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
  let result = await.model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  }
}

module.exports = router;