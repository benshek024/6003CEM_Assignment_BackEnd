const {validateUser} = require('../controllers/validation');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/users')
const can = require('../permissions/users');
const auth = require('../controllers/auth');

const router = Router({prefix: '/api/v1/users'})

router.get('/', auth, getAll)
router.post('/', bodyParser(), validateUser, createUsers)
router.get('/:id([0-9]{1,})', auth, getByID)
router.put('/:id([0-9]{1,})', validateUser, updateUsers)
router.del('/:id([0-9]{1,})', auth, deleteUsers)

async function getAll(ctx, next){
  const permission = can.readAll(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    let users = await model.getAll()
    if (users) {
      ctx.body = users
    }
  }
}

async function getByID(ctx){
  const permission = can.read(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    let id = ctx.params.id
    console.log(id)
    let users = await model.getByID(id)
    if (users.length){
      ctx.body = users[0]
    }
  }
}

async function createUsers(ctx){
  const body = ctx.request.body
  let result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  }
}

async function updateUsers(ctx){
  let id = ctx.params.id
  let updateUsers = ctx.request.body
  console.log(id)
  let users = await model.update(id, updateUsers)
  if (users){
    ctx.body = `The first users with usersID ${id} updated`
  }
}

async function deleteUsers(ctx){
  let id = ctx.params.id
  console.log(id)
  let users = await model.del(id)
  if (users){
    ctx.body = `The first worker with usersID ${id} deleted`
  }
}
module.exports = router;