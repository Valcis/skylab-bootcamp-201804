'use strict'

/*
.../add?n=1 => 1
.../add?n=3 => 4
.../add?n=5 => 9
.../sub?n=3 => 6
.../div?n=2 => 3
.../mul?n=5 => 15
.../clear => 0
 */

const express = require('express')
const expressSession = require('express-session')

const app = express()

app.use(expressSession({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
}))

app.get('/add', (req, res) => {
    const { query: { n }, session } = req

    if (typeof session.res !== 'number')  session.res = 0

    session.res += parseFloat(n)

    res.send(200, session.res)
})

app.get('/sub', (req, res) => {
    const { query: { n }, session } = req

    if (typeof session.res !== 'number')  session.res = 0

    session.res -= parseFloat(n)

    res.send(200, session.res)
})

app.get('/mul', (req, res) => {
    const { query: { n }, session } = req

    if (typeof session.res !== 'number')  session.res = 0

    session.res *= parseFloat(n)

    res.send(200, session.res)
})

app.get('/div', (req, res) => {
    const { query: { n }, session } = req

    if (typeof session.res !== 'number')  session.res = 0

    session.res /= parseFloat(n)

    res.send(200, session.res)
})

app.get('/clear', (req, res) => {
    const { query: { n }, session } = req

    session.res = 0

    res.send(200, session.res)
})

app.listen(3000)