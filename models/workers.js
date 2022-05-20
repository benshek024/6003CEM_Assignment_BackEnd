const dbMongo = require('../helpers/mongodb')

exports.getAll = async function getAll (page, limit, order){
  let data = await dbMongo.run_query('workers', {})
  return data
}

exports.getByID = async function getByID (id){
  let data = await dbMongo.run_query('workers', {'workerID': parseInt(id)})
  return data
}

exports.add = async function add (document){
  let status = await dbMongo.run_insert('workers', document)
  return status
}

exports.del = async function del (id){
  let status = await dbMongo.run_del('workers', {'workerID': parseInt(id)})
  return status
}

exports.findByUsername = async function getByUsername(workerLoginAcc) {
  let user = await dbMongo.run_query('workers', {'workerLoginAcc' : workerLoginAcc})
  console.log(user)
  return user;
}

exports.update = async function update (id, newvalues){
  let updateString = "{$set:" + JSON.stringify(newvalues)
  updateString+="}"
  console.log("updateString ", updateString)
  let status = await dbMongo.run_update('workers', {'workerID': parseInt(id)}, newvalues)
}