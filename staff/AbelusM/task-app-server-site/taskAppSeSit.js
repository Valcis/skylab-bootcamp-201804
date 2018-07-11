const express = require('express')
const bodyParser = require('body-parser')

const port = process.argv[2]

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // middleware

const tasks = []
const dones = []
let id = 0

app.get('/', (req, res) => {
    res.send(`${renderfun()}`)
})

app.post('/add-task', (req, res) => {
    const { body: { task } } = req
    
    tasks.push(task) 

    res.send(`${renderfun()}`)
})

app.post(`/add-done/:id`, (req, res) => {
    let idx = req.params.id

    dones.push(tasks[idx])
    tasks.splice(idx, 1);

    res.send(`${renderfun()}`)
})

app.post(`/remove-done/:id`, (req, res) => {
    let idx = req.params.id

    dones.splice(idx, 1);

    res.send(`${renderfun()}`)
})

renderfun = () => {
    const listToDo = []
    const listDone = []
    let rendering = ""

    if(tasks && tasks.length){
        for(let i = 0; i < tasks.length; i++){
            listToDo.push(`<form action="/add-done/${i}" method="POST">
            ${tasks[i]}<button type="submit">✔</button></form>`)
        }
        rendering += `<h3>TO DO</h3>\n${listToDo.join("")}`
    }
    if (dones && dones.length){
        for(let n = 0; n < dones.length; n++){
            listDone.push(`<form action="/remove-done/${n}" method="POST">
            ${dones[n]}<button type="submit">❌</button></form>`)
        }
        rendering += `<h3>DONE</h3>\n${listDone.join("")}`
    }

    return (
        `<html>
            <head>
                <title>Task-App</title>
            </head>
            <body>
                <form action="/add-task" method="POST">
                    <input type="text" name="task" placeholder="write a task"></input>
                    <button type="submit">+</button>
                </form>
                ${rendering}
            </body>
        </html>`)
}

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})