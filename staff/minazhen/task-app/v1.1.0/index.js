const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const port = process.argv[2] || 3000

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false })) // middleware


app.get('/', (req, res) => {
    res.send(renderfun(req))
})

app.post('/add-task', (req, res) => {
    const { body: { task } } = req
    
    try {
        logic.addTask(task)
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')
})

app.post(`/add-done`, (req, res) => {
    const { body: { id } } = req

    try {
        logic.markTaskDone(parseInt(id))
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')
})

app.post(`/remove-done`, (req, res) => {
    const { body: { id } } = req

    try {
        logic.removeTask(parseInt(id))
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')
})

renderfun = (req) => {
    const todos = logic.listTodos()
    const dones = logic.listDones()
    const { query: { error } } = req

    return (
        `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Tasks App</title>
                <link rel="stylesheet" href="vendor/bootstrap/4.1.0/css/bootstrap.min.css">
                <link rel="stylesheet" type="text/css" href="styles/main.css">
            </head>
            <body>
                <main>
                <h1>Task App</h1>
                <div class="container">
                    <div class="row justify-content-center">
                        <section class="add-task">
                            <form action="/add-task" method="POST" class="form-inline input-group mb-3">
                                <input type="text" name="task" id="task" placeholder="enter a task" class="form-control">
                                <div class="input-group-append">
                                <button type="submit" class="btn btn-success">Add</button>
                                </div>
                            </form>
                        </section> 
                    </div>
                    ${error? `<div class="alert alert-warning alert-dismissible">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Warning!</strong> ${error}
                  </div>
                    
                    ` : ''}
                    <div class="row">
                    <section class="toDo container">
                        ${todos.length ? `<h4>TO DO</h4><ul class="list-group">
                            ${todos.map(task => `
                            <form action="/add-done" method="post"><li class="list-group-item d-flex justify-content-between align-items-center"><span class="task-text">${task.text}</span><input type="hidden" name="id" value="${task.id}"><button type="submit" class="btn-outline-success badge">✔</button></form></li>`).join('')}`: ''}
                        </ul>
                        </section>
                    </div>
                    <div class="row">  
                    <section class="done container">  
                        ${dones.length ? `<h4>DONE</h4><ul class="list-group">
                            ${dones.map(task => `
                            <form action="/remove-done" method="post"><li class="list-group-item d-flex justify-content-between align-items-center"><span class="task-text">${task.text}</span><input type="hidden" name="id" value="${task.id}"><button type="submit" class="btn-outline-danger  badge">❌</button></form></li>`).join('')}` : ''}
                            </ul>
                            </section>
                    </div>
                </div>
                </main>
            <script src="vendor/jquery/3.3.1/jquery-3.3.1.min.js"></script>
            <script src="vendor/popper/1.14.3/popper.min.js"></script>
            <script src="vendor/bootstrap/4.1.0/js/bootstrap.min.js"></script>
            </body>
        </html>`)
}

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})