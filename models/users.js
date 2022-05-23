const dbMongo = require('../helpers/mongodb')

exports.getAll = async function getAll (page, limit, order){
  let data = await dbMongo.run_query('users', {})
  return data
}

exports.getByID = async function getByID (id){
  let data = await dbMongo.run_query('users', {'usersID': parseInt(id)})
  return data
}

exports.add = async function add (document){
  let status = await dbMongo.run_insert('users', document)
  return status
}

exports.del = async function del (id){
  let status = await dbMongo.run_del('users', {'usersID': parseInt(id)})
  return status
}

exports.findByUsername = async function getByUsername(usersLoginAcc) {
  let user = await dbMongo.run_check(usersLoginAcc)
  if (user) {
    console.log(`User found`)
  }
  else {
    console.log(`User not found`)
  }
  return user;
}

exports.findByPassword = async function getByPassword(usersLoginPwd) {
  let user = await dbMongo.run_query('users', {'usersLoginPwd': usersLoginPwd})
  return user;
}

exports.update = async function update (id, newvalues){
  let updateString = "{$set:" + JSON.stringify(newvalues)
  updateString+="}"
  console.log("updateString ", updateString)
  let status = await dbMongo.run_update('users', {'usersID': parseInt(id)}, newvalues)
}