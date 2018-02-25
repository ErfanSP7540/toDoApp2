var mongoose = require('mongoose')
var validator = require('validator')
const jwt = require('jsonwebtoken');

userSchema = new mongoose.Schema({
                                email:{
                                        type:String,
                                        required:true,
                                        trim:true,
                                        minlength:1,
                                        unique:true,
                                        validate:{
                                                validator:(VALUE)=>{ return validator.isEmail(VALUE) },
                                                message:'{VALUE} is not a valid email'
                                        }
                                },
                                password:{
                                        type:String,
                                        required:true,
                                        minlength:6
                                },
                                tokens:[{
                                        access:{
                                                type:String,
                                                require:true
                                        },
                                        token:{
                                                type:String,
                                                required:true

                                        }
                                }]
        })

userSchema.methods.generateAuthToken = function(){
        
        var access = 'auth';
        var token = jwt.sign({_id:this._id.toHexString(),access},'secretKey');
        this.tokens.push( {token,access})

        return this.save().then( ()=>token )
}


var userModel = mongoose.model('users',userSchema );
module.exports = { userModel }