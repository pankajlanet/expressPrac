require('./src/db/mongoose')
const express = require('express')
const task = require('./src/routers/task')
const user = require('./src/routers/user')
const app = express();
const port = process.env.PORT || 3000;

app.use(task)
app.use(user)

app.get("/", (req,res)=> {
    res.send("This is home page")
})

app.listen(port ,()=> {
   console.log("server is hosted on port : " , port) 
})



