'use strict'

const mongoose = require('mongoose')
const { User, Note } = require('.')
const expect = require('expect')

describe('models (notes)', () => {
    before(() => mongoose.connect('mongodb://localhost/skylab-bootcamp-201804-test'))

    beforeEach(() => Promise.all([User.remove(), Note.deleteMany()]))

    describe('create user', () => {
        it('should succeed', () => {
            const note = new Note({ text: 'my note' })

            const user = new User({ name: 'John', surname: 'Doe', email: 'johndoe@mail.com', password: '123' })

            user.notes.push(note)

            return user.save()
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe('John')
                    expect(user.surname).toBe('Doe')
                    expect(user.email).toBe('johndoe@mail.com')
                    expect(user.password).toBe('123')
                })
        })
        it('should throw error on already registered user', () => {

            logic.registerUser('Jack', 'Doe', 'jw@mzail.com', '123')
            logic.registerUser('Jack', 'Doe', 'jw@mail.com', '123')

                .catch(({ message }) => expect(message).to.equal('this user already exists'))
        }
        )
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})
