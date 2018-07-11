const mongoose = require('mongoose')
const { Card, Pet, Person } = require('./src/models')

mongoose.connect('mongodb://localhost/skylab-bootcamp-201804-test')
    .then(() => {
        // const Cat = mongoose.model('Cat', { name: String, age: Number })

        // const ron = new Cat({ name: 'Ron', age: 5 })

        // ron.save().then(() => {
        //     console.log('ya estoy salvao')

        //     mongoose.connection.close()
        // })

        // Cat.findOne({name:'Ron'})
        //     .then(console.log)

        // Cat.find({name: 'Ron'})
        //     .then(console.log)

        // Cat.updateMany({ name: 'Ron' }, { $set: { name: 'Whisky' } })
        //     .then(console.log)

        // Cat.find()
        //     .then(console.log)

        // Cat.remove({ name: 'Whisky' })
        //     .then(console.log)

        // const ron = new Cat({ name: 5, age: 'Ron' })

        // ron.save()
        //     .then(console.log)
        //     .catch(console.error)

        // const CardSchema = new mongoose.Schema({ id: String, subject: String, expiration: Date })
        // const PetSchema = new mongoose.Schema({
        //     name: String,
        //     family: {
        //         type: String,
        //         enum: ['adopted dog', 'adopted cat']
        //     },
        //     age: Number,
        //     weight: Number,
        //     color: String
        // })
        // const PersonSchema = new mongoose.Schema({
        //     name: String,
        //     surname: String,
        //     age: Number,
        //     gender: {
        //         type: String,
        //         enum: ['M', 'F', 'U']
        //     },
        //     cards: [CardSchema],
        //     pets: [{
        //         ref: 'Pet',
        //         type: mongoose.Schema.Types.ObjectId
        //     }]
        // })

        // const Card = mongoose.model('Card', CardSchema)
        // const Person = mongoose.model('Person', PersonSchema)
        // const Pet = mongoose.model('Pet', PetSchema)

        return Promise.all([Person.deleteMany(), Pet.deleteMany()])
            .then(() => Pet.create({ name: 'Ron', age: 5, family: 'adopted cat', weight: 4, color: 'black' }))
            .then(res => {
                const ronId = res._doc._id
                const creations = []

                // creations.push(Card.create({ id: '12345678Z', subject: 'National ID', expiration: new Date(2020, 1, 10) }))
                // creations.push(Card.create({ id: 'A123', subject: 'Cachas FIT', expiration: new Date(2019, 5, 1) }))

                const cardsAbel = []
                cardsAbel.push(new Card({ id: '12345678Z', subject: 'National ID', expiration: new Date(2020, 1, 10) }))
                cardsAbel.push(new Card({ id: 'A123', subject: 'Cachas FIT', expiration: new Date(2019, 5, 1) }))

                const cardsNuria = []
                cardsNuria.push(new Card({ id: '87654321A', subject: 'National ID', expiration: new Date(2025, 11, 4) }))

                creations.push(Person.create({ name: 'Abel', surname: 'Hernando', age: 31, gender: 'M', cards: cardsAbel, pets: [ronId] }))
                creations.push(Person.create({ name: 'Nuria', surname: 'Garcia', age: 60, gender: 'U', cards: cardsNuria, pets: [ronId] }))

                return Promise.all(creations)
            })
            .then(() => {
                mongoose.connection.close()

                console.log('done')
            })

    })
    .catch(console.error)
