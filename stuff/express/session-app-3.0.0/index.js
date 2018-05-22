const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const FileStore = require('session-file-store')(expressSession)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

app.get('/', (req, res) => {
    const { query: { q } } = req

    if (!req.session.history) {
        req.session.history = ''
    }

    if (typeof q === 'string' && q.trim().length > 0) req.session.history += `${q}, `

    res.send(req.session.history)
})

app.get('/clear', (req, res) => {
    delete req.session.history

    res.redirect('/')
})

app.listen(3000)