var {mongoose} = require('../server/db/mongoose')
var {todoModel} = require('../server/models/todo')
var {userModel} = require('../server/models/user')

//var id = '5a905f1d74851827fde0f408';
var id = '6a905f1d74851827fde0f48';
var {ObjectID} = require('mongodb')
if(!ObjectID.isValid(id)){ return console.log('id isnot valid')}

userModel.find({_id:id})
.then( doc=> {

    if(doc.length===0) { return console.log('NotFound')}
    console.log(doc)

})
.catch(  e=> { console.log('error')} ) 


userModel.findOne({_id:id})
.then( doc=> {
      if(!doc) { return console.log('NotFound')}
      console.log(doc)   
})
.catch(  e=> { console.log('error')} ) 



userModel.findById(id)
.then(  doc=> {  
    if(!doc){ return console.log('NotFound')}
    console.log(doc)   
})
.catch(  e => { console.log('error') } ) 