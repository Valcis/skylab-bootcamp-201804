const Hangman = require('./src/logic')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const port = process.argv[2] || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {

    const {error} = req.query

    res.render('index', {error, path: '/'})

})

app.post('/getWord', (req, res) => {

    const { word, attempts } = req.body

    try {
        if (attempts.length === 0) hangman = new Hangman(word)
        else hangman = new Hangman(word, Number(attempts))
    } catch ({message}) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/play')
})

app.get('/play', (req, res) => {
  
    if (typeof hangman === 'undefined') res.redirect('/')

    const { error } = req.query;
    const attempts = hangman._attempts;
    const guessed = hangman.guessed().join(' ');
    const status = hangman._status;
    const matchLetter = hangman._matchLetter
    const initGame = hangman._initGame

    res.render('play', {attempts, guessed, status, matchLetter, initGame, error, path: '/play'})
})

app.post('/check', (req, res) => {

    const { text } = req.body

    try {
        hangman.try(text)
    } catch ({ message }) {
        res.redirect(`/play?error=${message}`)
    }

    res.redirect('/play')
})


app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstoppin server');
    process.exit()
})


