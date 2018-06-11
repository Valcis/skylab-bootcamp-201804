const express = require('express')
const bodyParser = require('body-parser')
const logic = require("./src/logic")


const port = process.argv[2]

const app = express()
app.use(bodyParser.json()) // middleware

let notes = []

app.post('/api/notes', (req, res) => {
    const { body: { text } } = req

    logic.addNote(text)

    // ?

    // res.setHeader('content-type', 'application/json')

    // res.send(JSON.stringify({
    //     status: 'OK'
    // }))
    console.log("texto", text)
    res.status(201)
    res.json({ status: 'OK' })
})

app.get('/api/notes', (req, res) => {
    // res.setHeader('content-type', 'application/json')

    // res.send(JSON.stringify({
    //     status: 'OK',
    //     notes
    // }))

    let notes = logic.listNotes()

    res.json({
        status: "ok",
        message: "added ok!",
        notes
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const { params: { id } } = req
    const notes = logic.listNotes()
    const note = notes.find(v => v.id == id)

    if (note) {

        logic.removeNote(id)
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