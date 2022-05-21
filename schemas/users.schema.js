module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/workers",
  "title": "Worker",
  "description": "A worker in shelter",
  "type": "object",
  "properties": {
    "usersLoginAcc": {
      "description": "Worker's account name",
      "type": "string"
    },
    "usersLoginPwd": {
      "description": "Worker's login password",
      "type": "string"
    },
    "usersEmail": {
      "description": "Worker's personal email",
      "type": "string"
    },
    "usersName": {
      "description": "Worker's name",
      "type": "string"
    },
    "usersID": {
      "description": "worker's unique ID",
      "type": "integer",
      "minimum": 0
    },
    "usersRole": {
      "description": "User's role",
      "type": "string"
    }
  },
  "required": ["workerLoginAcc", "workerLoginPwd", "workerEmail", "workerName", "workerID"]
}