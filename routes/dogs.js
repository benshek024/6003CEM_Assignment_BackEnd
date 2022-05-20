const {validateDog} = require('../controllers/validation');
const Router = require('koa-router')
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser')
const model = require('../models/dogs')
const router = Router({prefix: '/api/v1/dogs'});
const request = require('request')

router.get('/', getAll)
router.post('/', bodyParser(),validateDog, createDog)
router.get('/:id([0-9]{1,})', getByDogID)
router.put('/:id([0-9]{1,})',bodyParser(), validateDog, updateDog)
router.del('/:id([0-9]{1,})', deleteDog)

async function getAll(ctx, next) {
  let dog = await model.getAll()
  if (dog) {
    ctx.body = dog
  }
}

async function getByDogID(ctx) {
  let id = ctx.params.id
  console.log(id)
  let dog = await model.getByDogID(id)
  if (dog) {
    ctx.body = dog[0]
  }
}

async function createDog(ctx) {
  const body = ctx.request.body
  let result = await model.addDog(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  }
}

async function deleteDog(ctx) {
  let id = ctx.params.id
  let dog = await model.delDog(id)
  if (dog) {
    ctx.body = `Dog with DogID ${id} deleted`
  }
}

async function updateDog(ctx) {
  let id = ctx.params.id
  let updateDog = ctx.request.body
  let dog = await model.updateDog(id, updateDog)
  if (dog) {
    ctx.body = `Dog with DogID ${id} updated`
  }
}

module.exports = router;