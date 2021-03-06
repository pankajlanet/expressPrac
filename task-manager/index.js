require('./src/db/mongoose')
const express = require('express')
const task = require('./src/routers/task')
const user = require('./src/routers/user')
const app = express();
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(task)
app.use(user)

app.get("/", (req,res)=> {
    res.send("home page")
    
})


app.listen(port ,()=> {
   console.log("server is hosted on port : " , port) 
})



