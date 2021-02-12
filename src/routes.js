const express = require('express');
const router = express.Router()
const { TaskModel } = require('./model/Task')


router.get('/', (req, res) => {
    res.send({ 'status': 'ok' })
});


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()

        if (!tasks) {
            return res.sendStatus(404)
        }

        // console.log('get', tasks)
        res.json(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            'message': e
        })
    }
});


router.post('/tasks', async (req, res) => {
    try {
        // TODO:
        // error handling

        const incomingTask = req.body
        if(!incomingTask.value ){
            // throw Error()
        }

        const task = new TaskModel({
            incomingTask,
            isEditing : false,
            status : 1
        })
        
        console.log(req.body, task);

        res.status(200).json(task)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            'message': e
        })
    }
})

router.delete('/tasks/:id', async (req, res) => {

    try {
        await Task.findOneAndDelete({ _id: req.params.id })

        res.status(200)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            'message': e
        })
    }

})


router.patch('/tasks/:id', async (req, res) => {
    try {
        let task = Task.findById(req.params.id)
        let params = req.body
        params['isEditing'] = false

        const updatedTask = await task.updateOne(params)

        if (!updatedTask) {
            return res.sendStatus(404)
        }

        res.status(200).json(updatedTask)
    } catch (e) {
        res.status(500).json({
            'message': e
        })
    }
})


router.post('/tasks/clean-reset', async (req, res) => {
    try {
        await Task.collection.drop()

        const tasks = await Task.insertMany(tasksJson)

        if (!tasks) {
            return res.sendStatus(404)
        }

        res.status(200).json(tasks)
    } catch (e) {
        res.status(500).json({
            'message': e
        })
    }

})

module.exports = router;
