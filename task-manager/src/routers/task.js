const express = require('express')
const router = express.Router()


router.get('/task' , (req,res)=> {
    res.send("This is user page")
})

module.exports = router