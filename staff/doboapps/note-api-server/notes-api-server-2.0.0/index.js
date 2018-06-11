'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const port = process.argv[2] || 3000

const app = express()
app.use(bodyParser.json()) // middleware

let notes = []

app.post('/api/notes', (req, res) => {
    const { body: { text } } = req

    try {
        const id = logic.addNote(text)

        res.status(201)
        
        res.json({ status: 'OK', data: { id } })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})




app.get('/api/find/:text', (req, res) => {
    const { params: { text } } = req

    try {
        const note = logic.findNotes(text)

        res.json({ status: 'OK', data: note })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})


app.get('/api/notes/:id', (req, res) => {
    const { params: { id } } = req

    try {
        const note = logic.retrieveNote(id)

        res.json({ status: 'OK', data: note })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})

app.get('/api/notes', (req, res) => {
    res.json({ status: 'OK', data: logic.listNotes() })
})

app.delete('/api/notes/:id', (req, res) => {
    const { params: { id } } = req

    try {
        logic.removeNote(id)

        res.json({ status: 'OK' })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})