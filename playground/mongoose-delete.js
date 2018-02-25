var {mongoose} = require('../server/db/mongoose')
var {todoModel} = require('../server/models/todo')
var {userModel} = require('../server/models/user')

//var id = '5a905f1d74851827fde0f408';


var id = '5a90602470c64128bf1ab464';
var {ObjectID} = require('mongodb')
if(!ObjectID.isValid(id)){ return console.log('id isnot valid')}

// userModel.remove({_id:id})
// .then( doc=> {

//     if(doc.n===0) { return console.log('NotFound')}
//     console.log('Successfully removed', doc)

// })
// .catch(  e=> { console.log('error')} ) 


// userModel.findOneAndRemove({_id:id})
// .then( doc=> {

//     if(!doc) { return console.log('NotFound')}
//     console.log('Successfully removed', doc)

// })
// .catch(  e=> { console.log('error')} ) 



userModel.findByIdAndRemove(id)
.then( doc=> {

    if(!doc) { return console.log('NotFound')}
    console.log('Successfully removed', doc)

})
.catch(  e=> { console.log('error')} )