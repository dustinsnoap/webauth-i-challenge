//IMPORTS
const express = require('express')
const server = express()
//middleware
const helmet = require('helmet')
const cors = require('cors')
//routes
const authRoutes = require('../api/auth/routes')
//sessions
const session = require('./session')

//APPLY MIDDLEWARE
server.use(express.json()) //everything is json
server.use(cors())  //allows communication between apps on the same machine
server.use(helmet())    //sets various http headers to increase security
server.use(session)


//APPLY ROUTES
server.use('/api', authRoutes)

module.exports  = server