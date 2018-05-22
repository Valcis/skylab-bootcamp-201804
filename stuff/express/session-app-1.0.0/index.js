const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const sessions = {}

app.get('/', (req, res) => {
    const { query: { q } } = req

    const id = getSessionId(req)

    if (!sessions[id]) sessions[id] = ''

    if (typeof q === 'string' && q.trim().length > 0) sessions[id] += `${q}, `

    res.send(sessions[id])

    console.log(JSON.stringify(sessions, null, 4))
})

app.post('/', (req, res) => {
    const { body: { q } } = req

    const id = getSessionId(req)

    if (!sessions[id]) sessions[id] = ''

    if (typeof q === 'string' && q.trim().length > 0) sessions[id] += `${q}, `

    res.send(sessions[id])

    console.log(JSON.stringify(sessions, null, 4))
})

app.get('/clear', (req, res) => {
    const id = getSessionId(req)

    delete sessions[id]

    res.redirect('/')
})

function getIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress
}

function getUserAgent(req) {
    return req.headers['user-agent']
}

function getSessionId(req) {
    const ip = getIp(req)
    const userAgent = getUserAgent(req)

    return `${ip}-${userAgent}`
}

app.listen(3000)