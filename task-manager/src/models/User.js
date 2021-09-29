const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema( {
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim  : true,
        lowercase  : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value))
            {
                   throw new Error("Email is invalid") 
            }
        }
        
    },
    age : {
        type:Number,
        default: 0,
        validate(value)
        {
            if(value <0)
            {
                throw new Error("Age must be a Positive number")
            }
        }

    }, 
    password : {
        type :String,
        minlength :7,
        trim:true,
    }
})

const User = mongoose.model('User', userSchema )


module.exports = User