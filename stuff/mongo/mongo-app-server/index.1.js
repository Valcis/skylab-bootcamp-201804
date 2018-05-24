const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/skylab-bootcamp-201804', (err, conn) => {
    if (err) throw err

    const db = conn.db()

    // const cars = db.collection('cars')

    // cars.find({}, (err, cursor) => {
    //     if (err) throw err

    //     // cursor.toArray(((err, cars) => console.log(cars)))

    //     cursor.toArray()
    //         //.then(console.log)
    //         .then(cars => {
    //             console.log(cars)

    //             conn.close()
    //         })
    //         .catch(console.error)
    // })

    // cars.find().toArray()
    //     //.then(console.log)
    //     .then(cars => {
    //         console.log(cars)

    //         //conn.close()
    //     })
    //     .catch(console.error)

    const notes = db.collection('notes')

    const userId = '123'

    // notes.insertOne({ text: 'hola mundo 2', userId })
    //     .then(console.log)
    //     .catch(console.error)

    // notes.findOne({ text: { $regex: 'hola'}})
    //     .then(console.log)
    //     .catch(console.error)

    // const insertions = []
    // for(let i = 0; i < 10; i++) {
    //     insertions.push(notes.insertOne({ text: `hola mundo ${i + 1}`, userId }))
    // }
    // Promise.all(insertions)
    //     .then(res => {
    //         console.log(res)

    //         conn.close()
    //     })
    //     .catch(console.error)

    // notes.find().sort({ text: 1}).toArray()
    //     .then(res => {
    //         console.log(res)

    //         conn.close()
    //     })
    //     .catch(console.error)

    notes.find().project({ _id: 0, text: 1 }).toArray()
        .then(res => {
            console.log(res)

            conn.close()
        })
        .catch(console.error)
})