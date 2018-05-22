'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/logic')
const port = process.argv[2] || 80

var wordToGuessed = ''
var logica = ''
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    logica = ''
    const { query: { error } } = req
    res.render('index', {error, path: '/' })
})

app.get('/play', (req, res) => {
    const { query: { error } } = req
    const {_wordGuessed, _wordToGuess, _status, _attempts} = logica
    res.render('play', {logica,_wordGuessed, _wordToGuess, _status, _attempts,  wordToGuessed, error, path: '/play' })
})

app.post('/set-word', (req, res) => {
    const { body: { word } } = req
      
    try {
        logica = new Hangman(word)
        wordToGuessed = logica._wordToGuess
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/play')
})

app.post('/try', (req, res) => {
    const { body: { char } } = req

    try {
        logica.try(char)
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/play')
})

app.get('/about', (req, res) => {
    res.render('about', { path: '/about' })
}) 

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')
    process.exit()
})