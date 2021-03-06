const {validateUser} = require('../controllers/validation');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/users')
const can = require('../permissions/users');
const auth = require('../controllers/auth');

const prefix = '/api/v1/users'
const router = Router({prefix: prefix});

router.get('/', auth, getAll)
router.post('/', bodyParser(), validateUser, createUsers)
router.get('/:id([0-9]{1,})', auth, getByID)
router.put('/:id([0-9]{1,})', validateUser, updateUsers)
router.del('/:id([0-9]{1,})', auth, deleteUsers)
router.post('/login', login)

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
  const permission = can.read(ctx.state.user, ctx.state.id);
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
  let result = await model.findByUsername(body.usersLoginAcc)
  console.log(body)
  console.log(body.usersLoginAcc)
  if (result) {
    console.log(result)
    console.log("User already exist!")
  } else {
    let result = await model.add(body)
    if (result) {
      ctx.status = 201
      ctx.body = result
      console.log(result)
      console.log("Success!")
    }
  }
}

async function login(ctx) {
  const body = ctx.request.body
  console.log(body)
  let accResult = await model.findByPassword(body.usersLoginPwd)
  if (accResult) {
    console.log("Account Match!")
  }
}

/*
async function login(ctx) {
  // return any details needed by the client
  const {usersID, usersLoginAcc, usersEmail, usersTelNum, usersName} = ctx.state.user
  const links = {
    self: `https://${ctx.host}${prefix}/${usersID}`
  }
  ctx.body = {usersID, usersLoginAcc, usersEmail, usersTelNum, usersName,  links};
}
*/

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