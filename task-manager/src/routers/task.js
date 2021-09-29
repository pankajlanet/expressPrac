const express = require('express')
const Task = require('../models/Task')
const router = express.Router()

// create task with post
// get all the task
// get task with id
// update task info
// delete task 


router.post('/tasks' ,async(req,res)=> {
    if(Object.keys(req.body).length === 0 )
    {
        res.send("Please send the task info in the body")
    }

    try{
    const task = await new Task(req.body)
    await task.save();

    res.send(req.body)
    }
    catch(e)
    {
        res.send("Unable to save the task")
    }

})

router.get('/tasks' , async(req,res)=> {
       const tasks = await Task.find();
       res.send(tasks)     

})

router.get('/tasks/:id' ,async(req,res)=> {
    try{
    const task  = await   Task.findById(req.params.id)
    res.send(task)
    }
    catch(e)
    {
        res.send({error : "task with that particular id is not present"})
    }
})

router.patch('/tasks/:id' , async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description' , "completed"]


    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation)
    {
        res.status(400).send({error : "You are not allowed to make changes accept description and completed status"})
    }

    try{
            const task = await Task.findByIdAndUpdate(req.params.id,req.body)
            res.send(task)
 }catch(e)
    {
        res.send({
            error : "please enter a valid id " 
        })
    }

})

router.delete('/tasks/:id' , async(req,res)=> {
    console.log(req.body.id)
    try{
    const task = await Task.findByIdAndDelete(req.params.id)
    }
    catch(e)
    {
        res.send("Unable to delete the task")
    }
    res.send("task deleted")
})
module.exports = router