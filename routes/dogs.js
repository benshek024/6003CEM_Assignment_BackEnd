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
router.post('/', bodyParser(), validateDog, createDog)
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
  let id = ctx.request.body
  console.log(id)
  console.log(id.dogID)
  let result = await model.checkDogID(id.dogID)
  if (result) {
    console.log(result)
    console.log("Dog ID used!")
  } else {
    const body = ctx.request.body
    let dog = await model.addDog(body)
    if (dog) {
      ctx.status = 201
      ctx.body = dog
    }
  }
}

/*
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
*/

async function deleteDog(ctx) {
  let dogID = ctx.params.id
  console.log("ctx ", ctx.params.id)
  let result = await model.testFind(dogID)
  if (!result) {
    console.log("No Record on Dog!")
  } else {
    console.log("Deleting Dog!")
    let dog = await model.delDog(dogID)
    if (dog) {
      ctx.body = `Dog with DogID ${id} deleted`
    }
  }
}

async function updateDog(ctx) {
  let dogBody = ctx.request.body
  let dogID = dogBody.dogID
  console.log("Dog Body")
  console.log(JSON.stringify(dogBody))
  console.log(`Received Dog ID ${dogID}`)
  let result = await model.checkDogID(dogBody.dogID)
  if (!result) {
    console.log("Result: ", result)
    console.log("Dog ID Not Found!")
  } else {
    console.log("Updating Dog's Information")
    let dog = await model.updateDog(dogID, dogBody)
    if (dog) {
      ctx.body = `Dog with DogID ${dogID} updated`
      console.log(`Dog with DogID ${dogID} updated`)
    } else {
      console.log(`Something went wrong. Unable to update Dog with DogID ${dogID}`)
    }
  }
}

module.exports = router;