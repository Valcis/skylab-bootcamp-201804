'use strict'

const mongoose = require('mongoose')
const expect = require('expect')
const logic = require('.')
const { User, Note } = require('../models')

describe('logic (notes)', () => {
    before(() => mongoose.connect('mongodb://localhost/skylab-bootcamp-201804-test'))

    beforeEach(() => Promise.all([User.remove(), Note.deleteMany()]))

    describe('register', () => {
        it('should succeed on correct dada', () =>
            logic.register('John', 'Doe', 'jd@mail.com', '123')
                .then(res => {
                    // res --> true
                    expect(res).toBeTruthy()
                })

        )

        // TODO error cases
        false && it('should throw error on no name', () =>
            logic.register()
                .catch(({ message }) => expect(message).toBe('name is not a string'))
        )
        false && it('should throw error on empty name', () =>
            logic.register('')
                .catch(({ message }) => expect(message).toBe('name is empty or blank'))
        )
        false && it('should throw error on blank name', () =>
            logic.register('      ')
                .catch(({ message }) => expect(message).toBe('name is empty or blank'))
        )
        false && it('should throw error on no surname', () =>
            logic.register('John')
                .catch(({ message }) => expect(message).toBe('surname is not a string'))
        )
        false && it('should throw error on empty surname', () =>
            logic.register('john', '')
                .catch(({ message }) => expect(message).toBe('surname is empty or blank'))
        )
        false && it('should throw error on blank surname', () =>
            logic.register('John', '      ')
                .catch(({ message }) => expect(message).toBe('surname is empty or blank'))
        )
        false && it('should throw error on no email', () =>
            logic.register('John', 'Doe')
                .catch(({ message }) => expect(message).toBe('email is not a string'))
        )
        false && it('should throw error on empty email', () =>
            logic.register('john', 'Doe', '')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on blank email', () =>
            logic.register('John', 'Doe', '      ')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on no password', () =>
            logic.register('John', 'Doe', 'jd@mail.com')
                .catch(({ message }) => expect(message).toBe('password is not a string'))
        )
        false && it('should throw error on empty password', () =>
            logic.register('john', 'Doe', 'jd@mail.com', '')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
        false && it('should throw error on blank password', () =>
            logic.register('John', 'Doe', 'jd@mail.com', '      ')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )

    })

    describe('authenticate', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(() =>
                    logic.login('jd@mail.com', '123')
                        .then(id => {
                            // console.log(id) --> 5b0aebb6b98eb2081624a976
                            expect(id).toBeDefined()

                        })

                )
        )

        false && it('should throw error on no email', () =>
            logic.login()
                .catch(({ message }) => expect(message).toBe('email is not a string'))
        )
        false && it('should throw error on empty email', () =>
            logic.login('')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on blank email', () =>
            logic.login('      ')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on no password', () =>
            logic.login('jd@mail.com')
                .catch(({ message }) => expect(message).toBe('password is not a string'))
        )
        false && it('should throw error on empty password', () =>
            logic.login('jd@mail.com', '')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
        false && it('should throw error on blank password', () =>
            logic.login('jd@mail.com', '      ')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )


    })

    describe('retrieve', () => {
        it('should succeed on correct data', () => {
            // TODO create user with User model
            // TODO logic.retrieve(id)

            const userCreatePromise = User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            const userLoginPromise = logic.login('jd@mail.com', '123')
                .then(id => expect(id).toBeDefined())

            Promise.all([userCreatePromise, userLoginPromise])
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(res[0].id).toBeDefined()
                    expect(res[0].name).toBe('John')
                    expect(res[0].surname).toBe('Doe')
                    expect(res[0].email).toBe('jd@mail.com')
                })

        })

        // TODO error cases
        false && it('should throw error on no id', () =>
            logic.retrieve()
                .catch(({ message }) => expect(message).toBe('id is not a string'))
        )
        false && it('should throw error on empty id', () =>
            logic.retrieve('')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )
        false && it('should throw error on blank id', () =>
            logic.retrieve('      ')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )
    })

    false && describe('add note', () => {
        it('should add on correct data', () =>
            logic.addNote(_userId, noteText)
                .then(id => {
                    expect(id).toBeDefined()

                    return cl.findOne({ _id: ObjectId(id) })
                        .then(({ _id, userId, text }) => {
                            expect(_id).toBeDefined()
                            expect(_id.toString()).toBe(id)
                            expect(userId).toBe(_userId)
                            expect(text).toBe(noteText)
                        })
                })
        )

        false && it('should add notes with different ids', () => {
            const additions = indexes.map(index => logic.addNote(_userId, `${noteText} ${index}`))

            return Promise.all(additions)
                .then(ids => {
                    expect(ids.length).toBe(indexes.length)

                    for (let i = 0; i < ids.length; i++)
                        for (let j = i + 1; j < ids.length; j++)
                            expect(ids[i]).not.toBe(ids[j])

                    const retrievals = ids.map(id => cl.findOne({ _id: ObjectId(id) }))

                    return Promise.all(retrievals)
                        .then(notes => {
                            expect(notes.length).toBe(indexes.length)

                            notes.forEach(({ _id, userId, text }, index) => {
                                expect(_id.toString()).toBe(ids[index])
                                expect(userId).toBe(_userId)
                                expect(text).toBe(`${noteText} ${indexes[index]}`)
                            })
                        })
                })
        })

        false && it('should throw error on no userId', () =>
            logic.addNote()
                .catch(({ message }) => expect(message).toBe('userId is not a string'))
        )

        false && it('should throw error on empty userId', () =>
            logic.addNote('')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        false && it('should throw error on blank userId', () =>
            logic.addNote('     ')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        false && it('should throw error on no text', () => {
            logic.addNote(_userId)
                .catch(({ message }) => expect(message).toBe('text is not a string'))
        })

        false && it('should throw error on empty text', () =>
            logic.addNote(_userId, '')
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        )

        false && it('should throw error on blank text', () =>
            logic.addNote(_userId, '   ')
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        )
    })


    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})

