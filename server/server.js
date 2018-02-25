const _ = require('lodash')
const {mongoose} = require('./db/mongoose')
const {userModel} = require('./models/user')
const {todoModel} = require('./models/todo')


const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());


// app.post('/users',(req,res)=>{

//        var body = _.pick(req.body,['email','password'])
//        if(  !_.isNull(body.email)  && !_.isNull(body.password) ){
           
//             var newUser =  new userModel(body);
//             newUser.save()
//             .then( doc=>{

//                 const jwt = require('jsonwebtoken');
//                 var access = 'auth';
//                 var token = jwt.sign({_id:newUser._id.toHexString(),access},'secretKey');
//                 newUser.tokens.push( {token,access})
//                 return newUser.save()
//             })
//             .then( doc=>{ 

//                         res
//                         .header('x_auth', doc.tokens[doc.tokens.length-1].token)
//                         .status(200)
//                         .send('successfullly record document:\n'+ JSON.stringify(_.pick(doc,['email','_id']))  )
//                         return console.log('successfullly record document:\n',_.pick(doc,['email','_id']));
//             })
//             .catch( e=>{
//                     res.status(400).send('failled record document:\n'+e)
//                     return console.log('failled record document:\n',e);
//             })
//        }else{

//            res.status(400).send('Incorrect Data')
//            return console.log('Incorrect Data');
//        }

// })


app.post('/users',(req,res)=>{

        var body = _.pick(req.body,['email','password'])
        if(  !_.isNull(body.email)  && !_.isNull(body.password) ){
            
             var newUser =  new userModel(body);
             newUser.save()
             .then( doc=>{
                return newUser.generateAuthToken()
             })
             .then( token=>{ 
 
                         res
                         .header('x_auth', token)
                         .status(200)
                         .send('successfullly record document:\n'+ JSON.stringify(_.pick(newUser,['email','_id']))  )
                         return console.log('successfullly record document:\n',_.pick(newUser,['email','_id']));
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





app.listen(3000);


// app.use((req,res,next)=>{
    //     console.log('url    : ',req);
    //     console.log('method : ',req.method);
    
    //     res.send({name:'efan'})
    
    //     next();
    // })
    
    
    
    // app.post('/todos',(req,res)=>{
        
        //     // console.log( typeof(req) );
        //     // console.log( Object.keys(req) );
        //     // console.log( Object.keys(bodyParser.json(req)));
        //     console.log(  Object.keys(req)   )
        //     res.send(  req.body)
        // })
        // app.post('/user',(req,res)=>{
            
        //     var newuser = new userModel({
        //         name :req.body.name,
        //         email:req.body.email,
        //         family:req.body.family,
        //         location:req.body.location,
        //         age:req.body.age,
        //     })
        //     newuser.save()
        //     .then(  doc=>{  res.status(200).send(req.body)
        //         return console.log( 'successfully document recorded : \n',doc)
        //     })
        //     .catch(  e=>{  console.log( 'error ' , e ) ;res.status(400).send(req.body)})
        // })    
        
        
        
        // app.post('/todo',(req,res)=>{
            
        //     var newTodo = new todoModel({ text :req.body.text})
            
        //     newTodo.save()
        //     .then(  doc=>{  res.status(200).send(req.body)
        //         return console.log( 'successfully document recorded : \n',doc)
        //     })
        //     .catch(  e=>{  console.log( 'error ' , e ) ;res.status(400).send(req.body)})
        // }) 
        // //todos
        
        // app.get('/todos',(req,res)=>{
            
            
        //     todoModel.find()
        //     .then(  doc=>{  res.status(200).send(doc)
        //         return console.log( 'successfully document recorded : \n',doc)
        //     })
        //     .catch(  e=>{  console.log( 'error ' , e ) ;res.status(400).send(req.body)})
        // })
        
        // app.get('/users',(req,res)=>{
            
            
        //     userModel.find()
        //     .then(  doc=>{  res.status(200).send({useres:doc } )
        //     return console.log( 'successfully document recorded : \n',doc)
        // })
        // .catch(  e=>{  console.log( 'error ' , e ) ;res.status(400).send(req.body)})
        // })
        
        
        
        // app.get('/user/:id', (req, res)=> 
        // {
        //     // res.send( req.params )
            
        //     var {ObjectID} = require('mongodb')
        //     if( !ObjectID.isValid(req.params.id) )
        //     {
        //         res.status(404).send();
        //         return console.log(`Request ID: ${req.params.id}   >> NOT VALID`); 
        //     }
            
            
        //     userModel.findById(req.params.id)
        //     .then ( doc=>{
                
        //         if(!doc)
        //         {   res.status(200).send(`Request ID: ${req.params.id} >> NOT FOUND`);
        //         return console.log(`Request ID: ${req.params.id} >> NOT FOUND`);
        //     }
        //     res.status(200).send(`Request ID: ${req.params.id} >> ${doc}`)    
        //     return console.log(`Request ID: ${req.params.id} >> ${doc}`);
        // })
        // .catch( e  =>{   res.status(400).send(`Request ID: ${req.params.id} >> ERROR`);
        // return console.log(`Request ID: ${req.params.id} >> ERROR`);    
        // })
        // })
        
        // app.delete('/user/:id',(req,res)=>{
            
        //     var id = req.params.id;
        //     var {ObjectID} =  require('mongodb');
        //     if(!ObjectID.isValid(id)){
        //         res.status(404).send(` Request ID : ${id} IS INVALID`)
        //         return  console.log(` Request ID : ${id} IS INVALID`);
        //     }
            
        //     userModel.findOneAndRemove({_id:id})
        //     .then( doc=>{
        //         if(!doc){
        //             res.status(404).send(` Request ID : ${id} Not Found`)
        //             return  console.log(` Request ID : ${id} Not Found`);            
        //         }
        //         res.status(200).send(` Request ID : ${id} >>\n${doc}`)
        //         return  console.log(` Request ID : ${id} >>\n${doc}`);    
        //     })
        //     .catch ( e=>{
        //         res.status(404).send(` Request ID : ${id} ERROR `)
        //         return  console.log(` Request ID : ${id} ERROR `);       
        //     }) 
            
        // })
        
        // app.patch('/todo/:id',(req,res)=>{
            
        //     var id = req.params.id;
        //     var {ObjectID} =  require('mongodb');
        //     if(!ObjectID.isValid(id)){
        //         res.status(404).send(` Request ID : ${id} IS INVALID`)
        //         return  console.log(` Request ID : ${id} IS INVALID`);
        //     }
            
        //     var newtodo  =  _.pick(req.body, ['text', 'compelete']);
            
        //     if(newtodo.compelete && _.isBoolean(newtodo.compelete)  && _.isString(newtodo.text) ){
        //         var compeletedAt = new Date().getTime();
                
        //         todoModel.findOneAndUpdate({_id:id},{...newtodo,compeletedAt},{new:true})
        //         .then( doc=>{ 
        //             if(!_.isNull(doc)){
        //                 res.status(200).send("successfully updated"+doc) 
        //                 return console.log("successfully updated"+doc)
        //             }
        //             res.status(200).send("Not Found That ID") 
        //             return console.log("Not Found That ID")
                    
        //         }) 
        //         .catch( e =>{ res.status(200).send("error")   })
                
        //     }else{
        //         res.status(404).send('Incorrect Data') 
        //     }
            
        // })
