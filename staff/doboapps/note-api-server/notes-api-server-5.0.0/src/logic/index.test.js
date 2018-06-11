'use strict'

const mongoose = require('mongoose')
const expect = require('expect')
const logic = require('.')
const { User, Note } = require('../models')

describe('logic (notes)', () => {
    before(() => mongoose.connect('mongodb://localhost/skylab-bootcamp-201804-test'))

    beforeEach(() => Promise.all([User.remove()/*, Note.deleteMany()*/]))

    describe('register user', () => {
        it('should succeed on correct dada', () =>
            logic.registerUser('John', 'Doe', 'jd@mail.com', '123')
                .then(res => expect(res).toBeTruthy())
        )

        it('should error on register with a email repeat', (done) => {
            let users = [];
       
            users.push(new User({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' }).save())
            users.push( new User({ name: 'John', surname: 'Smitch', email: 'js@mail.com', password: '123' }).save())
         
            Promise.all(users).then()
                .then(()=>{
                     logic.registerUser('John', 'macarthur', 'js@mail.com', '123')
                        .catch(({ message }) => {
                            expect(message).toBe('this email exists on the db')
                            done()
                        })
                })
        })

    })

    describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(() =>
                    logic.authenticateUser('jd@mail.com', '123')
                        .then(id => expect(id).toBeDefined())
                )
        )

        // TODO error cases
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return logic.retrieveUser(id)
                })
                .then(user => {
                    expect(user).toBeDefined()

                    const { id, name, surname, email, _id, password, notes } = user

                    expect(id).toBeDefined()
                    expect(name).toBe('John')
                    expect(surname).toBe('Doe')
                    expect(email).toBe('jd@mail.com')

                    expect(_id).toBeUndefined()
                    expect(password).toBeUndefined()
                    expect(notes).toBeUndefined()
                })
        )

        // TODO error cases
    })

    describe('udpate user', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return logic.updateUser(id, 'Jack', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '456')
                        .then(res => {
                            expect(res).toBeTruthy()

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).toBeDefined()

                            const { name, surname, email, password } = user

                            expect(user.id).toBe(id)
                            expect(name).toBe('Jack')
                            expect(surname).toBe('Wayne')
                            expect(email).toBe('jw@mail.com')
                            expect(password).toBe('456')
                        })
                })
        )
    })

    describe('unregister user', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return logic.unregisterUser(id, 'jd@mail.com', '123')
                        .then(res => {
                            expect(res).toBeTruthy()

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).toBeNull()
                        })
                })
        )

        // TODO error cases
    })


    describe('add note', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return logic.addNote(id, 'my note')
                        .then(noteId => {
                            expect(typeof noteId).toBe('string')
                            expect(noteId).toBeDefined()

                            return User.findById(id)
                                .then(user => {
                                    expect(user).toBeDefined()

                                    expect(user.notes).toBeDefined()
                                    expect(user.notes.length).toBe(1)

                                    const [{ id, text }] = user.notes

                                    expect(id).toBe(noteId)
                                    expect(text).toBe('my note')
                                })
                        })
                })
        )

        it('should throw error on wrong user id', () => {
            const userId = '123456781234567812345678'

            return logic.addNote(userId, 'my note')
                .catch(({ message }) => expect(message).toBe(`no user found with id ${userId}`))
        })
    })
    describe('retrieveNote', () => {

        it('should succeed on correct userId', () => {
            const note = new Note({ text: 'my note' })
            const user = new User({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            user.notes.push(note)
            const noteId = user.notes[user.notes.length - 1].id
            return user.save()
                .then(({ id: userId }) =>
                    logic.retrieveNote(userId, noteId)
                        .then(note => {
                            expect(note).toBeDefined()
                            expect(note.userId).toBe(userId)
                            expect(note.noteId).toBe(noteId)
                            expect(note.text).toBe('my note')
                        })
                )
        })
        it('should trhow error in noteId', () => {
            const note = new Note({ text: 'my note' })
            const user = new User({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            user.notes.push(note)
            const noteId = user.notes[user.notes.length - 1].id
            return user.save()
                .then(({ id: userId }) =>
                    logic.retrieveNote(userId, '123456788765432112345678')
                        .catch(({ message }) => {
                            expect(message).toBe(`note with id 123456788765432112345678 does not exist for userId ${userId}`)
                        })
                )
        })
    })

    describe('listNotes', () => {
        it('should list notes on correct userId', () => {
            const note1 = new Note({ text: 'my note' })
            const note2 = new Note({ text: 'my note2' })
            const user = new User({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            user.notes.push(note1)
            user.notes.push(note2)
            return user.save()
                .then(({ id: userId }) =>
                    logic.listNotes(userId)
                        .then((notes) => {
                            expect(notes).toBeDefined()
                            expect(notes.length).toBe(2)
                            expect(notes[0].text).toBe('my note')
                            expect(notes[1].text).toBe('my note2')
                        })
                )
        })

        it('should throw error on no userId', () => {
            const note1 = new Note({ text: 'my note' })
            const note2 = new Note({ text: 'my note2' })
            const user = new User({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            user.notes.push(note1)
            user.notes.push(note2)
            return user.save()
                .then(({ id: userId }) =>
                    logic.listNotes()
                        .catch(({ message }) => {
                            expect(message).toBe('you must input a userId')
                        })
                )
        })

        it('should throw error on wrong userId', () => {
            const note1 = new Note({ text: 'my note' })
            const note2 = new Note({ text: 'my note2' })
            const user = new User({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            user.notes.push(note1)
            user.notes.push(note2)
            return user.save()
                .then(({ id: userId }) =>
                    logic.listNotes('876543218765432187654321')
                        .catch(({ message }) => {
                            expect(message).toBe('userId not found')
                        })
                )
        })
    })


    describe('removeNote', () => {

        it('should remove notes from correct user', () => {
            const note1 = new Note({ text: 'my note1' })
            const note2 = new Note({ text: 'my note2' })
            const note3 = new Note({ text: 'my note2' })
            const note4 = new Note({ text: 'my note2' })
            const note5 = new Note({ text: 'my note2' })

            const user = new User({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            user.notes.push(note1)
            user.notes.push(note2)
            user.notes.push(note3)
            user.notes.push(note4)
            user.notes.push(note5)

            const noteId = user.notes[user.notes.length - 1].id
            return user.save()
                .then(({ id: userId }) =>
                    logic.removeNote(userId, note1.id)
                        .then((res) => {
                            expect(res).toBeDefined()
                            expect(res).toBeTruthy()
                            expect(res.notes.length).toBe(4)
                        })
                )
        })
    })


    describe('updateNote', () => {

        it('should update one note from correct id', () => {
            const note1 = new Note({ text: 'my note1' })
            const note2 = new Note({ text: 'my note2' })

            const user = new User({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            user.notes.push(note1)
            user.notes.push(note2)

            const noteId = user.notes[user.notes.length - 1].id
            return user.save()
                .then(({ id: userId }) =>
                    logic.updateNote(userId, note1.id, "my new note")
                        .then((res) => {
                            expect(res).toBeDefined()
                            expect(res).toBeTruthy()
                            expect(res.notes.length).toBe(2)
                            expect(res.notes[0].text).toBe('my new note')

                        })
                )
        })
    })


    describe('findNotes', () => {

        it('should get all notes using correct userId and text to search', () => {
            const note1 = new Note({ text: 'my note1' })
            const note2 = new Note({ text: 'my note2' })
            const note3 = new Note({ text: 'others' })

            const user = new User({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            user.notes.push(note1)
            user.notes.push(note2)
            user.notes.push(note3)

            const noteId = user.notes[user.notes.length - 1].id
            return user.save()
                .then(({ id: userId }) =>
                    logic.findNotes(userId, "note")
                        .then((filteredNotes) => {
                            expect(filteredNotes).toBeDefined()
                            expect(filteredNotes.length).toBe(2)
                            expect(filteredNotes[0].text).toBe('my note1')
                            expect(filteredNotes[1].text).toBe('my note2')
                        })
                )
        })
    })


    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})
