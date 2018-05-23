'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/logic-es6')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')

let newGame = null;
var letterArr = []

app.get('/', (req, res) => {
    if (newGame){
        var game = newGame  
    }
    res.render('index', { game, letterArr, path: '/' })
})

app.post('/insert-guess', (req, res) => {
    const { body: { word } } = req // req.body.word


    try {
        if (!newGame) {
            newGame = new Hangman(word)
        }
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')

})

app.post('/insert-try', (req, res) => {
    const { body: { letter } } = req // req.body.letter

    try {
        newGame.try(letter)
        letterArr.push(letter)
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')

})

// app.get('/game', (req, res) => {
//     res.render('game', { path: '/game' })
// })

const port = process.argv[2] || 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})


