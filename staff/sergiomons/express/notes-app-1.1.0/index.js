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
    </head>
    <body>
        <div class="container text-center" >
        <h1>Tasks App</h1>
        <h2>Add Task</h2>
        <form action="/add-task" method="POST">
        <div class="input-group mb-3">
            <input type="text" class="form-control" name="text" placeholder="enter a task">
            <div class="input-group-append">
            <button type="submit" class="btn btn-outline-secondary">Add</button>
         </div>
        </div>
        </form>
        ${error? `<h3 class="error">${error}</h3>` : ''}
        ${todos.length ? `<h2>TODO list</h2>
        <ul>
            ${todos.map(task => `<li><form action="/mark-task-done" method="post">${task.text} <input type="hidden" name="id" value="${task.id}"><button type="submit">√</button></form></li>`).join('')}
        </ul>`: ''}
        ${dones.length ? `<h2>DONE list</h2>
            <ul>
            ${dones.map(task => `<li><form action="/remove-task" method="post">${task.text} <input type="hidden" name="id" value="${task.id}"><button type="submit">†</button></form></li>`).join('')}
            </ul>` : ''}

            <script src="vendor/jquery/3.3.1/jquery-3.3.1.min.js"></script>
            <script src="vendor/popper/1.14.3/popper.min.js"></script>
            <script src="vendor/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    </body>
    </div>
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


// 'use strict'
// const logic = require('./src/logic')
// const express = require('express');
// const bodyParser = require('body-parser')

// const port = process.argv[2] || 3000

// const app = express()

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static('public'))

// app.get('/', (req, res) => {
//     const toDos = logic.listTodos()
//     const Dones = logic.listDones()

//     res.send(`<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <meta http-equiv="X-UA-Compatible" content="ie=edge">
//             <title>Document</title>)
//             <link rel='stylesheet' type='text/css' href='styles/main.css'>
//         </head>
//         <body>
//              <h1>Tasks App</h1>
//              <h2>Add Task</h2>
//              <form action="/add-task" method="POST">
//                 <input type="text" name="text" placeholder="enter a task">
//                 <button type="submit">Add</button>
//              </form>
//              ${toDos.length ? `<h2>TODO list</h2>
//              <ul>
//                ${toDos.map(task => `<li>${task.text}<form action='/markTaskDone method:'POST'><input type='hidden' name='id' value=${task.id}><button type='submit'>V</button> `)}
//              </ul>`: ''}
//          `)
// })

// app.post('/', (req, res) => {
//     const {text} = req.body;
    
//     logic.addTask(text)
// })

// app.post('/markTaskDone', (req, res) => {
//     const {id} = req.body;

//     logic.markTaskDone(parseInt(id));

//     res.redirect('/')



// })

// app.listen(port, () => {
//     console.log(`server running on port ${port}`)
// })
// process.on('SIGNIT', () => {
//     console.log(`\nstoppin server`)

//     process.exit()
// })
