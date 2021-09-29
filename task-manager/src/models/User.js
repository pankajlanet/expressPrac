const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
    },
    tokens : [{
        token : {
            type :String,
            required : true
        }
    }]
})



userSchema.statics.findbyCredentials = async(email,password)=> {
    
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function()  {
    const user = this;

    const token  = jwt.sign({_id : user._id.toString()  } , 'test' )
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;
}

//not a arrow function this is just for binding

//middleware  before saveing the database
userSchema.pre('save' , function (next) {
    const user = this;
    console.log("before saving to database")
    next();
} )
const User = mongoose.model('User', userSchema )


module.exports = User