'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/logic')
const alert = require('./node_modules/alert-node')


const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')


let newGame=null
let letters=[]

app.get('/', (req, res) => {

    if(newGame){var game=newGame}

    const error=req.query.error

    // const {query:{error}}=req

    res.render('index', {game,letters, error, path:'/'})
})

app.post('/add-word', (req, res)=>{

    const {body:{word}} = req
    try{
        if(!newGame){
            newGame = new Hangman(word)
        }

    }catch({message}){
        res.redirect(`/?error=${message}`)
    }


    res.redirect('/')
})
app.post('/insert-letter', (req, res)=>{
    
    const {body:{letter}} = req
    
    try{
            letters.push(letter)
            newGame.try(letter)
        
            if(newGame._status===1){
                alert('CONGRATULATIONS!!')
                newGame=null
                let letters=[]
                res.redirect('/')
        
            }
            else if(newGame._status===2){
                alert ("I'M SORRY!!")
                newGame=null
                let letters=[]
                res.redirect('/')
        
            }
            else if(newGame._status===0){
                
                res.redirect('/')
        
            }

        } catch({message}){
        res.redirect(`/?error=${message}`)
    }
})


const port = process.argv[2] || 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})