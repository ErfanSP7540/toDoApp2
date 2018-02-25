
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017',(error,client)=>{
    if(error){
        return console.log('connection Failed');
    }

    console.log('successfully connect to DB');

    const db = client.db('TodoApp')

    // db.collection('Users').find({}).toArray(  (err,docs)=>{

    //     if(err)
    //     { return console.log('Unable to fetch')}
    //     console.log(docs);
    // })

    // db.collection('Users').find({}).toArray()
    // .then(   doc=>{ console.log(doc);                })
    // .catch(  err=>{ console.log('Unable to fetch')   })     
  
    db.collection('Users').find({name:'erfan'}).toArray()
    .then(   doc=>{ console.log(doc);                })
    .catch(  err=>{ console.log('Unable to fetch')   })   


    db.collection('Users').find({name:'erfan'}).count()
    .then(   count=>{ console.log(count);                })
    .catch(  err=>{ console.log('Unable to fetch')   })   

    client.close();
    
})