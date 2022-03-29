const dbMongo = require('../helpers/mongodb')

exports.getAll = async function getAll (page, limit, order){
  let data = await dbMongo.run_query('workers', {})
  return data
}

exports.getByID = async function getByID (id){
  let data = await dbMongo.run_query('workers', {'workerID': parseInt(id)})
  return data
}

exports.add = async function add (document) {
  let status = await dbMongo.run_insert('workers', document)
  return status
}