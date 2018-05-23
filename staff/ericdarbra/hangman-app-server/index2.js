'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')

app.get('/', (req, res) => {

    const { query: { error } } = req

    res.render('index')
})

app.post('/new-game', (req, res) => {

    const { body: { word } } = req

   var hangman = new Hangman(word)
    word = hangman.guessed().join(" ")
    

    res.redirect('/',{word})
})

app.post('/game', (req, res) => {
    const { body: { word } } = req

    hangman.try(word)
    let splitWord = hangman.guessed()

    res.redirect('/')
})






const port = process.argv[2] || 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})