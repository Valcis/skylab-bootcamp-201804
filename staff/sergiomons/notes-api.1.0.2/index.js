const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const port = process.argv[2]

const app = express()
app.use(bodyParser.json()) 


app.post('/api/notes', (req, res) => {
    const { body: { text } } = req

try {
    const id = logic.addNote(text)

    res.status(201)
    res.json({ status: 'OK', data : {id}})

} catch ({message}) {
    res.status(400)
    res.json({ status: 'KO', message})
}

})

app.get('/api/notes', (req, res) => {

    const notes = logic._notes

    res.json({
        status: 'OK',
        notes
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const { params: { id } } = req

    
    try {
        const note = logic.removeNote(id)
        
        if (note) {
    
            res.json({ status: 'OK' })
        } else {
            res.status(404)
            res.json({ status: 'KO', error: `note with id ${id} not found` })
        }
    } catch ({message}) {
            res.json({ status : 'KO', message })
    }
})

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})