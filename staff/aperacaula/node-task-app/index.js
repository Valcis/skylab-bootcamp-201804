'use strict'

const express= require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')


const port = process.argv[2]

const app= express()


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))




app.get('/', (req,res)=>{

    const toDo= logic.listTodos()
    const dones= logic.listDones()
    const {query: {error}} = req

    res.send(
        `<!DOCTYPE html>
        
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Task App</title>
            <link rel="stylesheet" type="text/css" href="styles/main.css">
        </head>
        <body>
            <h1>Tasks App</h1>
            <form action="/task-adding" method="POST">
                <input type="text" name="taskToAdd" placeholder="write a task"></input>
                <button type="submit">Add task</button>
            </form>
            ${error? `<h3 class="error">${error}</h3>`:''}
            ${toDo.length? `<h2> To Do's </h2>
            <ul>
            ${toDo.map(task => `<li><form action="/mark-task-done" method="POST">${task.text}<input type="hidden" name="id" value="${task.id}"><button type="submit">DONE!</button></form></li>`).join('')}
            </ul>`:''}
            ${dones.length? `<h2> Done's </h2>
            <ul>
            ${dones.map(task => `<li><form action="/delete-task" method="POST">${task.text}<input type="hidden" name="id" value="${task.id}"><button type="submit">DELETE!</button></form></li>`).join('')}
            </ul>`:''}
        </body>
        </html>`
    )
})

app.post('/task-adding', (req,res)=>{

    const {body: {taskToAdd}}= req
    
    try{
        logic.addTask(taskToAdd)
    }catch({message}){
        res.redirect(`/?error=${message}`)
    }

    res.redirect(`/`)


})

app.post('/mark-task-done', (req,res)=>{

    const {body: {id}}= req
    
    try{
        logic.markTaskDone(parseInt(id))
    
    }catch({message}){
        res.redirect(`/?error=${message}`)
    }

    res.redirect(`/`)


})





app.post('/delete-task', (req,res)=>{

    const {body: {id}}= req
    
    try{
        logic.removeTask(parseInt(id))
    }catch({message}){
        res.redirect(`/?error=${message}`)
    }

    res.redirect(`/`)


})

app.get('/about', (req, res) => {
    res.render('about', { path: '/about' })
})

app.listen(port, ()=> console.log(`activated server on port ${port}`))

process.on('SIGINT', ()=>{
    console.log('\nstopped server')

    process.exit()
})