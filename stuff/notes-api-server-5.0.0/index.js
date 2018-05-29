'use strict'

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/routes')
const cors = require('cors')

mongoose.connect('mongodb://localhost/skylab-bootcamp-201804')
    .then(() => {
        const port = process.argv[2] || 3000

        const app = express()

        app.use(cors())

        app.use(bodyParser.json()) // middleware

        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port ${port}`))

        process.on('SIGINT', () => {
            console.log('\nstopping server')

            mongoose.connection.close(() => {
                console.log('db connection closed')

                process.exit()
            })
        })
    })
    .catch(console.error)