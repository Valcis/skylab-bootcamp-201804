'use strict'

const express = require('express')
const bodyParser = require('body-parser')
let logic = require('./src/logic')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))


app.get('/', (req, res) => {

    const todos = 

    res.status(200).send(`

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="vendor/bootstrap/4.1.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/main.css">
    </head>
    <body>
        <div class="jumbotron jumbotron-fluid">
            <h1>Tasks App</h1>
            <h2>Add Task</h2>
            <form action="/add-task" method="POST">
                <input class="form-control" type="text" name="text" placeholder="enter a task">
                <button class="btn btn-primary" type="submit">Add</button>
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

                <div class="card" style="width: 18rem;">
                <div class="card-header">
                  Featured
            </div>
                <ul class="list-group list-group-flush">

                    <li class="list-group-item">Cras justo odio</li>

                </ul>
            </div>
            </div>
                <ul class="list-group list-group-flush">

                    <li class="list-group-item">Cras justo odio</li>

                </ul>
            </div>
        </div>
        <script src="vendor/jquery/3.3.1/jquery-3.3.1.min.js"></script>
        <script src="vendor/popper/1.14.3/popper.min.js"></script>
        <script src="vendor/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    </body>
    </html>`)

})

app.post('/add-task', (req, res) => {

    const { body: { task } } = req

    logic.addTask(task)

    res.redirect('/')

})

app.get('/mark-task-done/:taskId', (req, res) => {

    const taskId = Number(req.params.taskId)

    logic.markTaskDone(taskId)

    res.redirect('/')
})

app.get('/remove-task/:taskId', (req, res) => {

    const taskId = Number(req.params.taskId)

    logic.removeTask(taskId)

    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server corriendo en http://localhost:${port}`)
})

