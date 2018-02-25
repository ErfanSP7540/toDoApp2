var mongoose = require('mongoose')

var todoModel = mongoose.model('todos', 
new mongoose.Schema({ 
                    text: {
                        type:String,
                        required: true,
                        trim:true,
                        minlength:1,
                    },
                    compelete:{
                        type:Boolean
                        ,default:false
                    },
                    compeletedAt:{
                         type:Number,
                         default:null
                        }
                    }));

module.exports = { todoModel }