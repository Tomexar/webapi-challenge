const express = require('express');

const Projects = require('./projectModel');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const projects = await Projects.get(req.params.id);
        if (projects) {
            res.status(200).json(projects);
        } else {
            res.status(404).json({ message: 'project not found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error getting projects' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newpro = await Projects.insert(req.body)
        res.status(201).json(newpro)
    } catch (error) {
        res.status(500).json({ message: "error adding project" })
    }
})

router.delete('/:id', async (req, res) => {
    const count = await Projects.remove(req.params.id);
    try {
        if (count > 0) {
            res.status(200).json({ message: 'project deleted' })
        } else {
            res.status(404).json({ message: 'project not found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error deleting project' })
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const edit = Projects.update(req.params.id, req.body);
        if(edit){
            res.status(200).json(edit);
        }else{
            res.status(404).json({ message: 'need more info' })
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'error updating'})
    }
})



module.exports = router;