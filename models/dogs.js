const dbMongo = require('../helpers/mongodb')

exports.getAll = async function getAll (page, limit, order) {
  let data = await dbMongo.run_query('dogs', {})
  return data
}

exports.getByDogID = async function getByDogID (id) {
  let data = await dbMongo.run_query('dogs', {'dogID' : parseInt(id)})
  return data
}

exports.addDog = async function addDog (document) {
  let status = await dbMongo.run_insert('dogs', document)
  return status
}

exports.delDog = async function delDog (id) {
  let status = await dbMongo.run_del('dogs', {'dogID' : parseInt(id)})
  return status
}

exports.findByDogname = async function getByDogname(dogName) {
  let dog = await dbMongo.run_query('dogs', {'dogName' : dogName})
  console.log(dog)
  return dog;
}

exports.findByAdoptable = async function getByAdoptable(adoptable) {
  let dog = await dbMongo.run_query('dogs', {'adoptable' : adoptable})
  console.log(dog)
  return dog;
}

exports.getSearch = async function getSearch(fields, q) {
  let dog = await dbMongo.run_query('dogs', {fields : {$in : q}})
  console.log(dog)
  return dog;
}

exports.updateDog = async function updateDog (id, newvalues) {
  let updateString = "{$set:"+ JSON.stringify(newvalues)
  updateString+="}"
  console.log("updateString ", updateString)
  let status = await dbMongo.run_update('dogs', {'dogID' : parseInt(id)}, newvalues)
  return status
}