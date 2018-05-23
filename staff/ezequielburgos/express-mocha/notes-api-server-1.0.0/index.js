const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const port = process.argv[2] || 3000

const app = express()
app.use(bodyParser.json()) // middleware

let notes = []

// Test it in Postman --> (nodemon index.js) --> (POST) http://localhost:3000/api/notes 
app.post('/api/notes', (req, res) => {
    const { body: { text } } = req

    try {
        logic.addNote(text)
        res.status(201)
        res.json({ status: 'OK' })
    } catch({message}){
        res.status(400)
        res.json({status: 'KO', error: message})
    }   
})

app.get('/api/notes', (req, res) => {
    const { params: { id } } = req

    try {
        res.json({
            status: 'OK',
            notes: logic.listNotes()
        })
    } catch({message}){
        res.status(400)
        res.json({status: 'KO', error: message})
    }  
   
})

app.delete('/api/notes/:id', (req, res) => {
    const { params: { id } } = req
    
    try {
        logic.removeNote(id)
        
        res.json({ status: 'OK' })
    } catch {
        res.status(404)
        res.json({ status: 'KO', error: `note with id ${id} not found` })
    }
})

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
    
})