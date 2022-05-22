module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/user",
  "title": "User",
  "description": "A user in website",
  "type": "object",
  "properties": {
    "usersLoginAcc": {
      "description": "User's account name",
      "type": "string",
    },
    "usersLoginPwd": {
      "description": "User's login password",
      "type": "string",
    },
    "usersEmail": {
      "description": "User's personal email",
      "type": "string",
    },
    "usersName": {
      "description": "User's name",
      "type": "string"
    },
    "_id": {
      "description": "User's unique ID",
      "type": "integer",
      "minimum": 0
    },
    "role": {
      "description": "User's role",
      "type": "string"
    }
  },
  "required": ["usersLoginAcc", "usersLoginPwd", "usersEmail", "usersName"]
}