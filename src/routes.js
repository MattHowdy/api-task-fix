const express = require('express');
const router = express.Router()
const Task = require('./model/Task')


router.get('/', (req, res) => { 
    res.send({'status': 'ok'})
});


router.get('/tasks', async(req, res) => { 
    await Task.find()
        .then(task => res.send(task))
        .catch( err => res.send(err))
});


router.post('/tasks/create', async(req,res) =>{
    let task = new Task({
        value : req.body.task,
        status : 1,
        is_editing : false,
        user_id : 1
    })

    await task.save()
        .then(task => res.send(task))
        .catch( err => res.send(err))
    
})

router.delete('/tasks/delete/:id', async(req,res)=>{
    await Task.findOneAndDelete({ _id :req.params.id})
        .then(task => res.send(task))
        .catch( err => res.send(err))
})


router.patch('/tasks/update/:id', async(req, res)=>{
    let task = Task.findById(req.params.id)

    let params = req.body 
    params['isEditing'] = false

    await task.updateOne(params)
        .then( task=> res.send(task))
        .catch( err => res.send(err))
})


router.post('/tasks/clean-reset', async(req, res)=>{
    await task.collection.drop()

    await task.insertMany(tasksJson)
        .then( res => res.send(err) )
        .catch( err => res.send(err))
})

module.exports = router ;
