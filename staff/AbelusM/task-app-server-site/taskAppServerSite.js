'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const port = process.argv[2] || 3000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
function AppTask() {
    const toDo = []
    const done = []
    let title = ''

    if (tasks && tasks.length) {
        for (let i = 0; i < tasks.length; i++)
            toDo.push(`<form action="/todotask/${i}" method="POST">
        ${tasks[i]}<button>done</button></form>`)
    }
    title += `<h3>TO DO's</h3>${toDo.join('')}`

    if (dones && dones.length) {
        for (let n = 0; n < dones.length; n++) {
            done.push(`form action="/dones/${n}" method="POST"
            ${dones[n]}<button>remove</button></form>`)
        }
    }
    title += `<h3>DONE</h3>${done.join('')}`

    return (`
    <html>
    <head><title>Task App Server Side</title></head>
    <main>
    <form action="/addtask" method="POST">
    <textarea name="task" placeholder="buy milk..."></textarea>
    <button type="submit">Add</button>
    </form>
    ${title}
        </main>
    </html>
    `)
}
const tasks = []
const dones = []
let id = 0

app.get('/', (req, res) => {
    res.send(`${AppTask()}`)
})

app.post('/addtask', (req, res) => {
    const { body: { task } } = req

    tasks.push(task)

    res.send(`${AppTask()}`)
})

app.post('/done/:id', (req, res) => {
    let index = req.params.id

    dones.push(tasks[index])
    tasks.splice(index, 1)

    res.send(`${AppTask()}`)
})

app.post('/remove/:id', (req, res) => {
    let index = req.params.id

    dones.splice(index, 1)

    res.send(`${AppTask()}`)
})

function AppTask() {
    const toDo = []
    const done = []
    let title = ''

    if (tasks && tasks.length) {
        for (let i = 0; i < tasks.length; i++){
            toDo.push(`<form action="/done/${i}" method="POST">
        ${tasks[i]}<button>done</button></form>`)}
        title += `<h3>TO DO's</h3>${toDo.join('')}`
    }

    if (dones && dones.length) {
        for (let n = 0; n < dones.length; n++) {
            done.push(`<form action="/remove/${n}" method="POST">
            ${dones[n]}<button>remove</button></form>`)
        }
        title += `<h3>DONE</h3>${done.join('')}`
    }

    return (`
    <html>
    <head><title>Task App Server Side</title></head>
    <main>
    <header><h1>TASK APP</h1></header>
    <form action="/addtask" method="POST">
    <textarea name="task" placeholder="buy milk..."></textarea>
    <button type="submit">Add</button>
    </form>
    ${title}
        </main>
    </html>
    `)
}

app.listen(port, () => console.log(`openning port at ${port}`))

process.on('SIGINT', () => {
    console.log('\nclosing server')

    process.exit()
})