var {userModel} = require('../models/user')
const _ = require('lodash')

var Authentication = (req,res,next)=>{

    var token = req.header('x_auth');
    if(!_.isNull(token)){

            userModel.findByToken(token)
            .then( doc=>{
                    if(_.isNull(doc)){
                            return Promise.reject();
                    }
                    req.user = doc;
                    req.token = token;
                    next();
                    
            })
            .catch( e=>{
                    res.status(401).send()
                    return console.log('error')
            })
    }else{
            res.status(401).send("header not has x_auth")
            return console.log("header not has x_auth")               
    } 
}
module.exports = {Authentication}