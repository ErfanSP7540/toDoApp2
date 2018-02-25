
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017',(error,client)=>{
    if(error){
        return console.log('connection Failed');
    }

    console.log('successfully connect to DB');

    const db = client.db('TodoApp')
    db
    .collection('Users')
    .findOneAndUpdate(
                      {name:'erfan'}
                     ,{$set:{compelete:false}}
                     ,{returnOriginal:false}
                    )
    .then(doc=>{ console.log(doc) })
    .catch( err => {console.log("cant to update");})
//https://docs.mongodb.com/manual/reference/operator/update/set/

    db
    .collection('Users')
    .findOneAndUpdate(
                      {_id: new ObjectID('5a8d0e6adaa13a0e6b824bea')}
                     ,{$set:{name:'AMIN'},$inc: { age: 1,}}
                     ,{returnOriginal :false}
                    )
    .then(doc=>{ console.log(doc) })
    .catch( err => {console.log("cant to update");})
//https://docs.mongodb.com/manual/reference/operator/update/inc/#up._S_inc

    
    client.close();
    
})