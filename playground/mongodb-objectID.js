const {MongoClient,ObjectID} = require('mongodb')

var obj = new ObjectID()
console.log(obj)
console.log(obj.getTimestamp())