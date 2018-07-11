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
        <link rel='stylesheet' href="vendor/bootstrap/4.1.0/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="styles/main.css">
    </head>
    <body>
    <div class="text-center cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <h1>Tasks App</h1>
        <h2>Add Task</h2>
        <form action="/add-task" method="POST">
            <input class="form-label-group" type="text" name="text" placeholder="enter a task">
            <button class="btn btn-sm btn-primary btn-block" type="submit">Add</button>
        </form>
        ${error? `<h3 class="error">${error}</h3>` : ''}
        ${todos.length ? `<h2>TODO list</h2>
        <ul>
            ${todos.map(task => `<li><form class="media text-muted pt-3" action="/mark-task-done" method="post">${task.text} <input class="form-label-group" type="hidden" name="id" value="${task.id}"><button class="btn btn-sm btn-primary btn-block" type="submit">√</button></form></li>`).join('')}
        </ul>`: ''}
        ${dones.length ? `<h2>DONE list</h2>
            <ul>
            ${dones.map(task => `<li><form action="/remove-task" method="post">${task.text} <input class="form-label-group" type="hidden" name="id" value="${task.id}"><button class="btn btn-sm btn-primary btn-block" type="submit">†</button></form></li>`).join('')}
            </ul>` : ''}
</div
            </body>
    <script src="jquery/3.3.1/jquery-3.3.1.js"></script>
    <script src="popper/1.14.3/popper.js"></script>
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