
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017',(error,client)=>{
    if(error){
        return console.log('connection Failed');
    }

    console.log('successfully connect to DB');

    const db = client.db('TodoApp')
    db.collection('Users').insertOne({name:'erfan',family:'seidi',location:'arak ',compelete:false/*,_id:123*/},(er,res)=>{
        if(er){
            return console.log('unable to record')
        }
        //console.log(JSON.stringify (res.ops,undefined,2));
        console.log(res.ops[0]._id.getTimestamp());
    })


    client.close();
    
})