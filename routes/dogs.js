const {validateDog} = require('../controllers/validation');
const Router = require('koa-router')
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser')
const model = require('../models/dogs')
const router = Router({prefix: '/api/v1/dogs'});
const request = require('request')

router.get('/', getAll)
router.get('/search/dogname/:dogName', searchDogName)
router.get('/search/adoptable/:adoptable', searchAdoptable)
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

async function searchDogName(ctx){
  let dogName = ctx.params.dogName
  console.log(dogName)
  let dog = await model.findByDogname(dogName)
  if (dog) {
    ctx.body = dog
  }
}

async function searchAdoptable(ctx){
  let adoptable = ctx.params.adoptable
  console.log(adoptable)
  let dog = await model.findByAdoptable(adoptable)
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

async function searchDog(ctx, next){
const permission = can.readAll(ctx.state.user);
 if (!permission.granted) {
    ctx.status = 403;
  } else {
    let {limit=20, page=1, fields="",q=""} = ctx.request.query;

    // ensure params are integers
    limit = parseInt(limit);
    page = parseInt(page);
    
    // validate values to ensure they are sensible
    limit = limit > 100 ? 100 : limit;
    limit = limit < 1 ? 10 : limit;
    page = page < 1 ? 1 : page;
   let result="";
  // search by single field and field contents 
   //need to validate q input
  if (q!="")
    result= await model.getSearch(fields, q)
    else
    result= await model.getAll(limit, page);
    if (result.length) {
      if (fields !== null) {
    // first ensure the fields are contained in an array
    // need this since a single field in the query is passed as a string
    if (!Array.isArray(fields)) {
      fields = [fields];
    }
    // then filter each row in the array of results
    // by only including the specified fields
    result = result.map(record => {
      partial = {};
      for (field of fields) {                                 
          partial[field] = record[field];
      }
      
      return partial;
    });      
  }
  ctx.body = result;
    }
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