const express = require('express')
const Hangman = require('./src/logic')
const bodyParser = require('body-parser')


let guess = 'hello'

let hangman = new Hangman('what')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'pug')

app.get('/', (req,res) => {
    const guessed = hangman.guessed()
    const attempts = hangman.attempts()
    const status = hangman.status()
  

    res.render('index.pug', {guessed,status,guess, attempts, Hangman})
})

app.post('/try', (req,res) =>{
    const {body: {text}} = req
    hangman.try(text)
    
    res.redirect('/')
})

/* app.post('/guess', (req,res)=>{
    const{body:{guess}} = req
    hangman = new Hangman(guess)
    
    //res.redirect('/')
})
 */
app.post('/new-game', (req, res) =>{
    const {body:{guess}} = req
    hangman = new Hangman(guess)
    res.redirect('/')
})

const port = process.argv[2] || 3050
app.listen(port,console.log(`server running on port ${port}`))
process.on('SIGINT', ()=>{
    console.log('stopping server')
    process.exit()
})
