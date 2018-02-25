
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017',(error,client)=>{
    if(error){
        return console.log('connection Failed');
    }

    console.log('successfully connect to DB');

    const db = client.db('TodoApp')    


//delete one
    // db.collection('Users').find().count()
    // .then(   count=>{ console.log(count);                })
    // .catch(  err=>{ console.log('Unable to fetch')   })   
    
    
    // db.collection('Users').deleteOne({name:'erfan'})
    // .then(   doc=>{ console.log("record Deleted"   , doc.result);                })
    // .catch(  err=>{ console.log('Unable to Deleted')   })   


    // db.collection('Users').find().count()
    // .then(   count=>{ console.log(count);                })
    // .catch(  err=>{ console.log('Unable to fetch')   })   


//deletemany

db.collection('Users').deleteMany({name:'amin'})
.then(   doc=>{ console.log("record Deleted"  ,doc.result);             })
.catch(  err=>{ console.log('Unable to delete',err)   })   


//findOneAndDelete   // return that record deleted


db.collection('Users').findOneAndDelete({name:'erfan'})
.then(   doc=>{ console.log("record Deleted"  ,doc);             })
.catch(  err=>{ console.log('Unable to delete',err)   })   

    client.close();
    
})