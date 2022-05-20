module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/workers",
  "title": "Worker",
  "description": "A worker in shelter",
  "type": "object",
  "properties": {
    "workerLoginAcc": {
      "description": "Worker's account name",
      "type": "string"
    },
    "workerLoginPwd": {
      "description": "Worker's login password",
      "type": "string"
    },
    "workerEmail": {
      "description": "Worker's personal email",
      "type": "string"
    },
    "workerName": {
      "description": "Worker's name",
      "type": "string"
    },
    "workerID": {
      "description": "worker's unique ID",
      "type": "integer",
      "minimum": 0
    },
  },
  "required": ["workerLoginAcc", "workerLoginPwd", "workerEmail", "workerName", "workerID"]
}