const express = require('express');
const router = express.Router();

const database = {};
router.get('/', (req, res) => {
    try {
        let {page, limit} = req.query;
        if(!page){
            page=1;
        }
        if(!limit){
            limit=10;
        }

        const tasks = Object.values(database).slice((page-1)*limit,limit*page);
        res.status(200).json(tasks);
        console.log("Tasks fetched Successfully!")
    } catch (error) {
        console.error("Task not fetched!", error)
        res.status(500).json({ error: "An error getting for fetching" })
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const task = database[id]
        if (task === undefined) {
            res.status(404).json({ error: `${id} not found` });
            return;
        }

        res.status(200).json(task);
        console.log(`Fetch task ${id}`);
    } catch (error) {
        console.error(`Task not getting this `, error);
        res.status(500).json({ error: " task not getting id" })
    }
});

router.post('/', (req, res) => {
    try {

        const { title, description } = req.body;
        if(!(title && description)){
            res.status(400).json({error:"title and description are required"});
            return;
        }
        let id = Math.round(Math.random() * 1000);
        const newTasks = ({ id, title, description });
        database[id] = newTasks;
        res.status(200).json(newTasks);
        console.log("Task Added")
    } catch (error) {
        console.error(`Task not getting this `, error);
        res.status(500).json({ error: " task not getting id" })
    }
});

router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        if(!(title && description)){
            res.status(400).json({error:"title and description are required"});
            return;
        }
        const task = database[id];
        // if the key id is not present in the database(javascript object) then the task will be undefined
        if (task === undefined) {
            res.status(404).json({ error: `${id} not found` });
            return;
        }
        task.title = title;
        task.description = description;

        res.status(200).json(task);
        console.log(`Fetch task ${id}`);

    } catch (error) {
        console.error(`Task not added this  `, error);
        res.status(500).json({ error: " task not adding id" })
    }
})
router.delete('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const task = database[id];
        if (task === undefined) {
            res.status(404).json({ error: `${id} not found` });
            return;
        }
        delete database[id];
        res.status(200).json(task)
        console.log(`deleted Successfully`, task)
    } catch (error) {
        console.error(`Task not getting this `, error);
        res.status(500).json({ error: " task not getting id" })
    }
})
module.exports = router;

