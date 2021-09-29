const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const router =  express.Router();


// create user with post
// user login post
// user logout post
// user logout all
// get user info
// update user info patch
// delete user
// change profile pic

router.post('/user' ,async(req,res)=> {
    if(Object.keys(req.body).length === 0 )
    {
        res.send("Please send the details in body")
    }
    try
    {
    
     const password = await bcrypt.hash(req.body.password , 8)   
    const user  = new User({...req.body , password})
    await user.save()
    const token =  await user.generateAuthToken()
    res.send({ confirmation  : "user created successfully" , ...req.body  ,token }) 

    }
    catch(e)
    {
        res.send("Unable to store in database")
    }
})


router.post('/user/login', async(req,res)=> {
        console.log("this is the function")
 
    try{
        const user = await  User.findbyCredentials(req.body.email , req.body.password) 
        const token  = await user.generateAuthToken()   
        res.send({user , token})
    }catch(e)
    {
        res.send({error : e.message})
    }

})

router.post('/user/logout' , (req,res)=> {
    res.send("User logged out successfully")
})

router.post('/user/logout/all' , (req,res) => {
    res.send("All users are logged out successfully");
})

router.get('/user'  , async(req,res)=> {
    const allUsers =   await User.find()

    res.send(allUsers)
} )

router.patch('/user' , (req,res)=> {
     console.log(req.params)   
    res.send("Updated user info");
})


router.delete("/user" , (req,res)=> [
    res.send("user deleted")
])

router.patch('/avatar/me' ,(req,res)=> {
    res.send("User profile pic updated")
} )

module.exports = router