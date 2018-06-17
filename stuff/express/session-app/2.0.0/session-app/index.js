'use strict'

const express = require('express')
const cookieSession = require('cookie-session')

const app = express()
app.use(cookieSession({
    name: 'my-session',
    keys: ['secret-phrase']
}))

const storage = {}

app.get('/', (req, res) => {
    const { query: { q } } = req

    if (!req.session.historyId) {
        req.session.historyId = Date.now().toString()

        storage[req.session.historyId] = ''
    }

    if (typeof q === 'string' && q.trim().length > 0) storage[req.session.historyId] += `${q}, `

    res.send(storage[req.session.historyId])
})

app.get('/clear', (req, res) => {
    delete req.session.historyId

    res.redirect('/')
})

app.listen(3000)