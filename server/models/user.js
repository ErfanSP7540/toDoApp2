var mongoose = require('mongoose')
var validator = require('validator')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

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
userSchema.statics.findByToken = function(token){
         try {
            var decode =jwt.verify( token ,'secretKey'); 
            return this.findById(decode._id) 
         } catch (error) {
           //return  new Promise( (res,rej)=>{   rej('decoding fail')  } )  
           return Promise.reject("decoding fail")
         }
         
}


userSchema.pre('save',function(next){
        var user = this;
        if(user.isModified('password'))
        {
                bcrypt.genSalt(10, function(err, salt) {
                if(!err){
                        bcrypt.hash(user.password, salt, function(err, hash) {
                                if(!err){
                                        user.password = hash;
                                        console.log('hash:',hash);
                                        console.log('user.password:',user.password);
                                        next();                                        
                                }
                        })
                        }})        

        }else{ next();   }

})


var userModel = mongoose.model('users',userSchema );
module.exports = { userModel }