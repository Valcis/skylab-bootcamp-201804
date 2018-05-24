const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/skylab-bootcamp-201804', (err, conn) => {
    if (err) throw err

    console.log('todo bien')

    const db = conn.db()

    const cars = db.collection('cars')

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

    cars.find().toArray()
        //.then(console.log)
        .then(cars => {
            console.log(cars)

            conn.close()
        })
        .catch(console.error)
})