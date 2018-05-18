const express = require('express')
const bodyParser = require('body-parser')

const port = process.argv[2]

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // middleware

const notes = []

app.get('/', (req, res) => {
    res.send(`<html>
        <head>
            <title>Notes App</title>
        </head>
        <body>
            <form action="/add-note" method="POST">
                <textarea name="note" placeholder="write a note"></textarea>
                <button type="submit">keep</button>
            </form>
        </body>
    </html>`)
})

app.post('/add-note', (req, res) => {
    const { body: { note } } = req

    notes.push(note)

    res.send(`<html>
        <head>
            <title>Notes App</title>
        </head>
        <body>
            <form action="/add-note" method="POST">
                <textarea name="note" placeholder="write a note"></textarea>
                <button type="submit">keep</button>
            </form>
            <ul>
                ${notes.map(note => `<li>${note}</li>`).join('')}
            </ul>
        </body>
    </html>`)
})

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})