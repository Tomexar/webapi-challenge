const express = require('express')

const Actions = require('./actionModel')
const Projects = require('./projectModel')

const router = express.Router();


function exists(req, res, next){
    const projects = Projects.get(req.params.id)
}

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get(req.params.name);
        if (actions) {
            res.status(200).json(actions);
        } else {
            res.status(404).json({ message: 'action not found' })
        }

    } catch (error) {
        console.log(error)
        res.status({ message: 'error getting actions' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        console.log(req.body.project_id)
        const action = await Actions.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'action not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error getting actions' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newact = await Actions.insert(req.body)
        res.status(201).json(newact)
    } catch (error) {
        res.status(500).json({ message: 'error adding action' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const edit = Actions.update(req.params.id, req.body);
        if (edit) {
            res.status(200).json(edit);
        } else {
            res.status(404).json({ message: 'need more info' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error updating' })
    }
})


router.delete('/:id', async (req, res) => {
    const count = await Actions.remove(req.params.id);
    try {
        if (count > 0) {
            res.status(200).json({ message: 'action deleted' })
        } else {
            res.status(404).json({ message: 'action not found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error deleting action' })
    }
})

module.exports = router;