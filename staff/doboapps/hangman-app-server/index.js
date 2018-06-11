'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/logic')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')

let hangman;

app.get('/', (req, res) => {

    const { query: { word } } = req

    res.render('index', { word })
})

app.post('/new-game', (req, res) => {

    const { body: { word } } = req

    hangman = new Hangman(word)
    let _word = hangman.guessed().join(" ")


    res.redirect(`/?word=${_word}`)

})

app.post('/try', (req, res) => {
    const { body: { letter } } = req

    hangman.try(letter)
    let _word = hangman.guessed().join(" ")
    let correctWord = hangman.word


    switch (hangman.status()) {
        case 0:
            res.redirect(`/?word=${_word}`)
            break;
        case 1:
            res.redirect(`/final?word=${correctWord}&status=win`)
            break;
        case 2:
            res.redirect(`/final?word=${correctWord}&status=lose`)
            break;
        default:
            res.send("error")
    }
})

app.get('/final', (req, res) => {

    const { query: { word, status } } = req

    res.render('final', { word, status })
})






const port = process.argv[2] || 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})