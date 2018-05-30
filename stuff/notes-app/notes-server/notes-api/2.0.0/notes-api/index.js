'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const port = process.argv[2] || 3000

const app = express()
app.use(bodyParser.json()) // middleware

app.post('/api/users/:userId/notes', (req, res) => {
    const { params: { userId }, body: { text } } = req

    try {
        const id = logic.addNote(userId, text)

        res.status(201)

        res.json({ status: 'OK', data: { id } })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})

app.get('/api/users/:userId/notes/:id', (req, res) => {
    const { params: { userId, id } } = req

    try {
        const note = logic.retrieveNote(userId, id)

        res.json({ status: 'OK', data: note })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})

app.get('/api/users/:userId/notes', (req, res) => {
    const { params: { userId }, query: { q } } = req

    if (q) {
        try {
            res.json({ status: 'OK', data: logic.findNotes(userId, q) })
        } catch ({ message }) {
            res.status(400)

            res.json({ status: 'KO', error: message })
        }
    } else
        res.json({ status: 'OK', data: logic.listNotes(userId) })
})

app.delete('/api/users/:userId/notes/:id', (req, res) => {
    const { params: { userId, id } } = req

    try {
        logic.removeNote(userId, id)

        res.json({ status: 'OK' })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})

app.patch('/api/users/:userId/notes/:id', (req, res) => {
    const { params: { userId, id }, body: { text } } = req

    try {
        logic.updateNote(userId, id, text)

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