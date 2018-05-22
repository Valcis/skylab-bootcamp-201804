'use strict'

const express = require('express')

const port = process.argv[2]

const app = express()

app.get('/', (req, res) => {
    res.send(`<html>
        <head>
            <title>Calculator App</title>
        </head>
        <body>
            <form action="/calculate" method="GET">
                <input type="text" name="a" placeholder="a">
                <input type="text" name="b" placeholder="b">
                <button type="submit">calculate</button>
            </form>
        </body>
    </html>`)
})

app.get('/calculate', (req, res) => {
    const { query: { a, b } } = req

    const sum = parseFloat(a) + parseFloat(b)

    res.send(`<html>
        <head>
            <title>Calculator App</title>
        </head>
        <body>
            <p>Result: ${sum}</p>
        </body>
    </html>`)
})

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})