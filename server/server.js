const _ = require('lodash')
const {mongoose} = require('./db/mongoose')
const {userModel} = require('./models/user')
const {todoModel} = require('./models/todo')
const jwt = require('jsonwebtoken');

const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());


// 3
const {Authentication} = require('../server/middleware/Authentication')
app.post('/users/me',Authentication,(req,res)=>{
        
        res.send(JSON.stringify( _.pick(req.user,['email','password'])  ))
        return console.log('Cuser:\n',req.user)
 })

// 2
// app.post('/users/me',(req,res)=>{
        
//         var token = req.header('x_auth');
        
//         if(!_.isNull(token)){
 
//                 userModel.findByToken(token)
//                 .then( doc=>{
//                         if(_.isNull(doc)){
//                                 return Promise.reject();
//                         }
//                         res.send(JSON.stringify( _.pick(doc,['email','password'])  ))
//                         return console.log('Cuser:\n',doc)
                        
//                 })
//                 .catch( e=>{
//                         res.send("query error:"+e)
//                         return console.log('query error'+e)
//                 })
//         }else{
//                 res.status(401).send("header not has x_auth")
//                 return console.log("header not has x_auth")               
//         } 
//  })




//  1
// app.post('/users/me',(req,res)=>{
        
//         var encode = req.header('x_auth');
        
//         if(!_.isNull(encode)){
//                 console.log('dakhel******************');
                
//                 try {
//                   var decode =jwt.verify( encode ,'secretKey'); 
//                 }catch (error) {
//                   res.send("decoding error")
//                   return console.log('decoding error')                        
//                 }
 
//                 userModel.findById(decode._id)
//                 .then( doc=>{
//                         if(!_.isNull(doc)){
//                                 res.send(JSON.stringify( _.pick(doc,['email','password'])  ))
//                                 return console.log('Cuser:\n',doc)
//                         }
//                         else{
//                           res.send("not found error")
//                           return console.log('not found error')                               
//                         }
                      
//                 })
//                 .catch( e=>{
//                         res.send("query error")
//                         return console.log('query error')
//                 })
//         }else{
//                 res.send("header not has x_auth")
//                 return console.log("header not has x_auth")               
//         } 
//  })

app.post('/users',(req,res)=>{

       var body = _.pick(req.body,['email','password'])
       if(  !_.isNull(body.email)  && !_.isNull(body.password) ){
           
            var newUser =  new userModel(body);
            newUser.save()
            .then( doc=>{

                
                var access = 'auth';
                var token = jwt.sign({_id:newUser._id.toHexString(),access},'secretKey');
                newUser.tokens.push( {token,access})
                return newUser.save()
            })
            .then( doc=>{ 

                        res
                        .header('x_auth', doc.tokens[doc.tokens.length-1].token)
                        .status(200)
                        .send('successfullly record document:\n'+ JSON.stringify(_.pick(doc,['email','_id']))  )
                        return console.log('successfullly record document:\n',doc);
            })
            .catch( e=>{
                    res.status(400).send('failled record document:\n'+e)
                    return console.log('failled record document:\n',e);
            })
       }else{

           res.status(400).send('Incorrect Data')
           return console.log('Incorrect Data');
       }

})


// app.post('/users',(req,res)=>{

//         var body = _.pick(req.body,['email','password'])
//         if(  !_.isNull(body.email)  && !_.isNull(body.password) ){
            
//              var newUser =  new userModel(body);
//              newUser.save()
//              .then( ()=>{
//                 return newUser.generateAuthToken()
//              })
//              .then( token=>{ 
 
//                          res
//                          .header('x_auth', token)
//                          .status(200)
//                          .send('successfullly record document:\n'+ JSON.stringify(_.pick(newUser,['email','_id']))  )
//                          return console.log('successfullly record document:\n',_.pick(newUser,['email','_id']));
//              })
//              .catch( e=>{
//                      res.status(400).send('failled record document:\n'+e)
//                      return console.log('failled record document:\n',e);
//              })
//         }else{
 
//             res.status(400).send('Incorrect Data')
//             return console.log('Incorrect Data');
//         }
 
//  })





app.listen(3000);
