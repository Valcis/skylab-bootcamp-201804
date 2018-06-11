const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bodyParserJson = bodyParser.json()
const User = require('./model/schema/User')

mongoose.connect('mongodb://carlo:p@ds231360.mlab.com:31360/skylab-flights')
    .then(() => {
        const app = express()

        const route = express.Router()

        app.use('/api', route)

        route.get('/get', (req, res) => {
            User.find()
            .then(users => res.json({status:'OK', data:users}))
            .catch(err => { res.json({status:'KO', message:err.message})})
        })

        route.post('/post', bodyParserJson, (req, res) => {
            const { body: { text } } = req
            res.json({ message: text })
        })

        route.get('/get3', (req, res) => {
            res.send('hola get 3!!')
        })

        const port = process.argv[2] || 3000

        app.listen(port, () => console.log(`server open in port ${port}`))
    })
    .catch(err => {
        console.log(`error conexion ${err.message}`)
        mongoose.connection.close()
    })