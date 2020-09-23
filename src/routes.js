const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router()
const Task = require('./model/Task')


router.get('/', (req, res) => { 
    res.send({'status': 'ok'})
});


router.get('/tasks', async(req, res) => { 
    await Task.find({}, (err, result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
});


router.post('/tasks/clean-reset', async(req, res)=>{
    await task.collection.drop()

    await task.insertMany(tasksJson, (err, result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

router.post('/tasks/create-task', (req,res) =>{

    let task = new Task({
        value : req.body.task,
        status : 1,
        is_editing : false,
        user_id : 1
    })

    task.save()
        .then(task => res.send(task))
        .catch( err => res.send(err))
    
})



module.exports = router ;
