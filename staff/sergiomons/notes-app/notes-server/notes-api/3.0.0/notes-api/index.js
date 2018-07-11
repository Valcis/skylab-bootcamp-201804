'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/routes')

const port = process.argv[2] || 3000

const app = express()
app.use(bodyParser.json()) // middleware

app.use('/api', router)

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})