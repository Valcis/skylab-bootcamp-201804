'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const todos = logic.listTodos()
    const dones = logic.listDones()
    const { query: { error } } = req

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" type="text/css" href="styles/main.css">
        <link rel="stylesheet" href="vendor/bootstrap/4.1.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/main.css">
    </head>
    <body> 
      <div class="text-center p-5 m-5 bg-light" > 
        <h1 class="text-warning">Tasks App</h1><br>
        <h2>Add Task</h2>
        <form action="/add-task" method="POST">
            <input class="form-control m-2" type="text" name="text" placeholder="enter a task">
            <button  class="btn btn-success" type="submit">Add</button>
        </form>
        ${error? `<h4 class="error">${error}</h4>` : ''}
        ${todos.length ? `<h4 class="m-2">TODO list</h4>
        <ul>
            ${todos.map(task => `<li><form class="m-2" action="/mark-task-done" method="post">            
            <span class="text-info">${task.text} </span>
            <input type="hidden"  name="id" value="${task.id}"><button class="btn btn-info" type="submit">√</button></form></li>`).join('')}
        </ul>`: ''}
        ${dones.length ? `<h4 class="m-2">DONE list</h4>
            <ul>
            ${dones.map(task => `<li><form class="m-2" action="/remove-task" method="post">
            <span class="text-danger">${task.text}</span>
            <input type="hidden" class="btn btn-danger" name="id" value="${task.id}"><button class="btn btn-danger" type="submit">†</button></form></li>`).join('')}
            </ul>` : ''}
        <script src="vendor/jquery/3.3.1/jquery-3.3.1.min.js"></script>
        <script src="vendor/popper/1.14.3/popper.min.js"></script>
        <script src="vendor/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    
        </div>
    </body>
    </html>`)
})

app.post('/add-task', (req, res) => {
    const { body: { text } } = req

    try {
        logic.addTask(text)
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')
})

app.post('/mark-task-done', (req, res) => {
    const { body: { id } } = req

    try {
        logic.markTaskDone(parseInt(id))
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')
})

app.post('/remove-task', (req, res) => {
    const { body: { id } } = req

    try {
        logic.removeTask(parseInt(id))
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