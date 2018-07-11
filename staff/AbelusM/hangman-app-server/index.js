'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./scripts/logic')
const port = process.argv[2] || 3000 
let hangman = new Hangman('')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    let guessed = hangman.guessed().join(' ')
    let attempts = hangman.attempts()
    let guessWord = hangman.arrWord

    res.render('index.pug', { hangman, guessed, attempts, guessWord, path: '/' })
})

app.post("/try-word", (req, res) => {
    const { body: { text } } = req
    hangman.try(text)
    
    res.redirect('/')
})

app.post("/add-word", (req, res) => {
    const { body: { word } } = req
    hangman = new Hangman(word)
    
    res.redirect('/')
})

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})