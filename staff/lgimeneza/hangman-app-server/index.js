'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/hangman-random')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

const attempts = 7

let hangmans = []

let hangman = new Hangman('hello', attempts)

app.listen(port, () => {
    console.log(`Node server corriendo en http://localhost:${port}`)
})

app.get('/', function(req, res) {

    res.render('home', { guessed: hangman.guessed().join(' '), status: hangman.status(), attempts: attempts - hangman.attempts() });

});

app.post('/try-letter', function(req, res) {
    const { body: { text } } = req
    hangman.try(text)

    res.redirect('/')
});

app.post('/new-game', function(req, res) {
    hangman = new Hangman('hello', attempts)

    res.redirect('/')
});

app.get('/new-game', function(req, res) {
    hangman = new Hangman('hello', attempts)

    res.redirect('/')
});