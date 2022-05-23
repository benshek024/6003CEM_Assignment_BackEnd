module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/dog",
  "title": "Dog",
  "description": "A dog in dog list",
  "type": "object",
  "properties": {
    "dogName": {
      "description": "Main title of the dog",
"type": "string"
    },
    "dogBody": {
      "description": "Body text of the dog",
      "type": "string"
    },
    "summary": {
      "description": "Optional short text summary of dog",
      "type": "string"
    },
    "imageURL": {
      "description": "URL for main image to show in dog",
      "type": "uri"
    },
    "adoptable": {
      "description": "Is the dog adoptable or not",
      "type": "string"
    },
    "_id": {
      "description": "dog's unique ID",
      "type": "integer",
      "minimum": 0
    },
  },
  "required": ["dogName", "dogBody", "dogID", "adoptable"]
}