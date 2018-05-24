'use strict'

const { MongoClient } = require('mongodb')
const express = require('express')

MongoClient.connect('mongodb://localhost:27017/skylab-bootcamp-201804', { useNewUrlParser: true }, (err, conn) => {
    if (err) throw err

    const db = conn.db()

    const persons = db.collection('persons')

    const app = express()

    app.get('/add-person', (req, res) => {
        const { query: { name, surname } } = req

        persons.insertOne({ name, surname })
            .then(() => res.json({ status: 'OK' }))
            .catch(({ message }) => {
                res.status(400)

                res.json({ status: 'KO', error: message })
            })
    })

    app.get('/list-persons', (req, res) => {
        persons.find().toArray()
            .then(persons => res.json({ status: 'OK', data: persons }))
            .catch(({ message }) => {
                res.status(400)

                res.json({ status: 'KO', error: message })
            })
    })

    const port = process.argv[2] || 3000

    app.listen(port, () => console.log(`server running on port ${port}`))

    process.on('SIGINT', () => {
        console.log('\nstopping server')

        conn.close()

        process.exit()
    })
})