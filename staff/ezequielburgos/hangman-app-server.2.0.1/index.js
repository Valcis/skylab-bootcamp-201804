'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/logic-es6')
const alert = require('./node_modules/alert-node')
// var confirm = require('confirm-dailog')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')

let newGame = null;
var letterArr = []

app.get('/', (req, res) => {

    var { query: { error } } = req

    res.render('index', { error, letterArr, path: '/' })
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

    res.redirect('/game')

})

app.post('/insert-try', (req, res) => {
    const { body: { letter } } = req // req.body.letter

    try {
        newGame.try(letter)
        letterArr.push(letter)

        if (newGame._status === 1) {
            alert('contratulations!')
            newGame = null
            let letterArr = []
            res.redirect('/')

        } else if (newGame._status === 2) {
            alert('You lose!')
            newGame = null
            let letterArr = []
            res.redirect('/')
        } else if (newGame._status === 0) {
            res.redirect('/game')
        }

    } catch ({ message }) {
        res.redirect(`/game?error=${message}`)
    }


})

app.get('/game', (req, res) => {
    var { query: { error } } = req

    if (newGame) {
        var game = newGame
    }

    res.render('game', { game, error, letterArr, path: '/game' })
})

const port = process.argv[2] || 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})


