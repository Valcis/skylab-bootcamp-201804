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

    res.send(
        `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Hangman app server</title>
            <link rel="stylesheet" href="vendor/bootstrap/4.1.0/css/bootstrap.min.css">
            <link rel="stylesheet" href="styles/main.css">
        </head>
        
        <body>
            <main class="container main">
                <section class="p-3 mb-2 bg-dark text-white">
                    <h1>HANGMAN App</h1>
                    <p>Welcome! insert a letter or the whole word:</p>
                </section>
                <section class="main-div">
                    <div>
                        <p>insert a word to be guessed:</p>
                    </div>
                    <form action="/insert-guess" method="POST">
                        <input type="text" name="word" placeholder="letter or word">
                        <button type="submit" class="btn btn-primary">Try me!</button>
                    </form>
                </section>
                </div>
                <div class="container main">
                    <section class="p-3 mb-2 bg-dark text-white">
                        ${req.query.error ? `<h3 style="color: red;">${req.query.error}</h3>` : ''}
                        <p>Insert the word you want to be guessed:</p>
                        ${newGame ? `<p>${newGame._guessed.join(" ")}</p> <p>STATUS: ${newGame._status} <p>ATTEMTPS: ${newGame._attempts}</p>` : '<p>here goes the new word</p>'}
                        ${letterArr.length ? `<p>Introduced letters: ${letterArr.join(' ')}</p>` : '<p>letter</p>'}                        
                    </section>
                    <section class="main-div">
                    <p>Insert a word or a letter:</p>
                    <form action="/insert-try" method="post">
                        <input type="text" name="letter" placeholder="enter a letter or word">
                        <button type="submit" class="btn btn-primary">Insert Word</button>
                    </form>
                    </section>
                </div>
            </main>
        </body>
        <script src="vendor/jquery/3.3.1/jquery-3.3.1.min.js"></script>
        <script src="vendor/popper/1.14.3/popper.min.js"></script>
        <script src="vendor/bootstrap/4.1.0/js/bootstrap.min.js"></script>
        </html>`
    )
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

const port = process.argv[2] || 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})


