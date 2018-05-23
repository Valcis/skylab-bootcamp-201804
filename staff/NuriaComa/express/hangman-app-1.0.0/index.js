'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/logic')
const alert = require('./node_modules/alert-node')


const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
// app.set('view engine', 'pug')


let newGame=null
let letters=[]

app.get('/', (req, res) => {

    res.send(`<!DOCTYPE html>
       <html lang="en">
           <head>
               <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <meta http-equiv="X-UA-Compatible" content="ie=edge">
               <link rel="stylesheet" href="vendor/bootstrap/4.1.0/css/bootstrap.min.css">
               <link rel="stylesheet" href="styles/main.css">
               <title>HANGMAN APP</title>
           </head>
           <body>
               <main class='container'>
                   <section class='box1'>
                       <article>
                           <h1 class="text-info">HANGMAN</h1>
                           <p class="text">Insert the word that wants to be guessed</p>
                       <article>
                       </article>
                           <form action='/add-word' method='POST'>
                               <input class='inpIndex' name='word' type='text' placeholder="word">
                               
                               <button class="btn btn-outline-info" type='submit'>ACCEPT</button>
                               
                           </form>
                       </article>
                   </section>
                   <section class='box2'>
                       <article class="ord1">  
                       ${newGame ? `<p class='letters'>Letters</p><p class='letters'>${letters.join(' ')}</p> `:''}
                       </article>
                       <article class="ord2">
                       ${newGame ? `<p class='guessed'> ${newGame._guessed.join(' ')}</p>
                       <p class="text" >Insert the letter or the word that you think are correct</p> 
                        <form action='/insert-letter' method='POST'>
                        <input class='inpIndex'autocomplete="off" type='text' name='letter' placeholder="letter or word">
                        
                        <button class="btn btn-outline-info">TRY</button>`:''}
                        
                        </form>
                       </article>
                       <article class="ord3">
                       ${newGame ? `<p class='attempts'>${newGame._attempts}  </p>`:''}
                       </article>
                   </section>
               </main>
               <script src="vendor/jquery/3.3.1/jquery-3.3.1.min.js"></script>
               <script src="vendor/popper/1.14.3/popper.min.js"></script>
               <script src="vendor/bootstrap/4.1.0/js/bootstrap.min.js"></script>
           </body>
       </html>`)
})

app.post('/add-word', (req, res)=>{

    const {body:{word}} = req
    
    if(!newGame){
        newGame = new Hangman(word)
    }

    res.redirect('/')
})
app.post('/insert-letter', (req, res)=>{

    const {body:{letter}} = req
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

})


const port = process.argv[2] || 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})