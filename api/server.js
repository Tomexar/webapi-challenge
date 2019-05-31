const express = require('express')

const server = express();
const projectRouter = require('../data/helpers/projectRouter.js')
server.use(express.json())

server.use('/projects', projectRouter)

server.get('/', (req, res)=>{
    res.status(200).json({ message: 'hello'})
})

module.exports = server