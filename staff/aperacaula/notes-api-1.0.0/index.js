const express = require('express')
const bodyParser = require('body-parser')
const logic= require('./src/logic.js')
const port = process.argv[2]

const app = express()
app.use(bodyParser.json()) // middleware



app.post('/api/notes', (req, res) => {
    const { body: { text } } = req
    logic.addNote(text)
    // ?

    // res.setHeader('content-type', 'application/json')

    // res.send(JSON.stringify({
    //     status: 'OK'
    // }))

    res.status(201)
    res.json({ status: 'OK' })
})

app.get('/api/notes', (req, res) => {
    // res.setHeader('content-type', 'application/json')

    // res.send(JSON.stringify({
    //     status: 'OK',
    //     notes
    // }))
    let notes= logic.listNotes()

    res.json({
        status: 'OK',
        notes
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const { params: { id } } = req

    const note = notes.find(note => note.id == id)

    if (note) {
        //notes = notes.filter(note => note.id !== parseInt(id))
        notes = notes.filter(note => note.id != id)

        res.json({ status: 'OK' })
    } else {
        res.status(404)

        res.json({ status: 'KO', error: `note with id ${id} not found` })
    }

})

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})