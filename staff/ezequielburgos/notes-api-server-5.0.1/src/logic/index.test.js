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

        // TODO error cases
        it('should throw error on existing user', () =>
            logic.registerUser('Jack', 'Wayne', 'jw@mail.com', '123')
                .then(res => {
                    expect(res).toBeTruthy()
                    return logic.registerUser('Jack', 'Wayne', 'jw@mail.com', '123')
                        .catch(({ message }) => expect(message).toBe('user already exists'))
                })

        )
        false && it('should throw error on no name', () =>
            logic.registerUser()
                .catch(({ message }) => expect(message).toBe('name is not a string'))
        )
        false && it('should throw error on empty name', () =>
            logic.registerUser('')
                .catch(({ message }) => expect(message).toBe('name is empty or blank'))
        )
        false && it('should throw error on blank name', () =>
            logic.registerUser('      ')
                .catch(({ message }) => expect(message).toBe('name is empty or blank'))
        )
        false && it('should throw error on no surname', () =>
            logic.registerUser('John')
                .catch(({ message }) => expect(message).toBe('surname is not a string'))
        )
        false && it('should throw error on empty surname', () =>
            logic.registerUser('john', '')
                .catch(({ message }) => expect(message).toBe('surname is empty or blank'))
        )
        false && it('should throw error on blank surname', () =>
            logic.registerUser('John', '      ')
                .catch(({ message }) => expect(message).toBe('surname is empty or blank'))
        )
        false && it('should throw error on no email', () =>
            logic.registerUser('John', 'Doe')
                .catch(({ message }) => expect(message).toBe('email is not a string'))
        )
        false && it('should throw error on empty email', () =>
            logic.registerUser('john', 'Doe', '')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on blank email', () =>
            logic.registerUser('John', 'Doe', '      ')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on no password', () =>
            logic.registerUser('John', 'Doe', 'jd@mail.com')
                .catch(({ message }) => expect(message).toBe('password is not a string'))
        )
        false && it('should throw error on empty password', () =>
            logic.registerUser('john', 'Doe', 'jd@mail.com', '')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
        false && it('should throw error on blank password', () =>
            logic.registerUser('John', 'Doe', 'jd@mail.com', '      ')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
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
        false && it('should throw error on no email', () =>
            logic.authenticateUser()
                .catch(({ message }) => expect(message).toBe('email is not a string'))
        )
        false && it('should throw error on empty email', () =>
            logic.authenticateUser('')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on blank email', () =>
            logic.authenticateUser('      ')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on no password', () =>
            logic.authenticateUser('jd@mail.com')
                .catch(({ message }) => expect(message).toBe('password is not a string'))
        )
        false && it('should throw error on empty password', () =>
            logic.authenticateUser('jd@mail.com', '')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
        false && it('should throw error on blank password', () =>
            logic.authenticateUser('jd@mail.com', '      ')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
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
        false && it('should throw error on no id', () =>
            logic.retrieveUser()
                .catch(({ message }) => expect(message).toBe('id is not a string'))
        )
        false && it('should throw error on empty id', () =>
            logic.retrieveUser('')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )
        false && it('should throw error on blank id', () =>
            logic.retrieveUser('      ')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )
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

        // it('should throw error on existing email', () =>
        //     logic.registerUser('Eze', 'Burgos', 'eb@mail.com', '123')
        //         .then(res => {
        //             expect(res).toBeTruthy()
        //             return logic.authenticateUser('eb@mail.com', '123')
        //         })
        //         .then(id => {
        //             expect(id).toBeDefined()
        //             return logic.updateUser(id, 'Eze', 'Burgos', 'eb@mail.com', '123', 'jw@mail.com', '123')
        //         })
        //         .catch(({ message }) => expect(message).toBe('this email already exist'))

        // )
        false && it('should throw error on no id', () =>
            logic.updateUser()
                .catch(({ message }) => expect(message).toBe('id is not a string'))
        )
        false && it('should throw error on empty id', () =>
            logic.updateUser('')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )
        false && it('should throw error on blank id', () =>
            logic.updateUser('      ')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )
        false && it('should throw error on no name', () =>
            logic.updateUser()
                .catch(({ message }) => expect(message).toBe('name is not a string'))
        )
        false && it('should throw error on empty name', () =>
            logic.updateUser('')
                .catch(({ message }) => expect(message).toBe('name is empty or blank'))
        )
        false && it('should throw error on blank name', () =>
            logic.updateUser('      ')
                .catch(({ message }) => expect(message).toBe('name is empty or blank'))
        )
        false && it('should throw error on no surname', () =>
            logic.updateUser('John')
                .catch(({ message }) => expect(message).toBe('surname is not a string'))
        )
        false && it('should throw error on empty surname', () =>
            logic.updateUser('john', '')
                .catch(({ message }) => expect(message).toBe('surname is empty or blank'))
        )
        false && it('should throw error on blank surname', () =>
            logic.updateUser('John', '      ')
                .catch(({ message }) => expect(message).toBe('surname is empty or blank'))
        )
        false && it('should throw error on no email', () =>
            logic.updateUser('John', 'Doe')
                .catch(({ message }) => expect(message).toBe('email is not a string'))
        )
        false && it('should throw error on empty email', () =>
            logic.updateUser('john', 'Doe', '')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on blank email', () =>
            logic.updateUser('John', 'Doe', '      ')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on no password', () =>
            logic.updateUser('John', 'Doe', 'jd@mail.com')
                .catch(({ message }) => expect(message).toBe('password is not a string'))
        )
        false && it('should throw error on empty password', () =>
            logic.updateUser('john', 'Doe', 'jd@mail.com', '')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
        false && it('should throw error on blank password', () =>
            logic.updateUser('John', 'Doe', 'jd@mail.com', '      ')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
        false && it('should throw error on no newEmail', () =>
            logic.updateUser('John', 'Doe')
                .catch(({ message }) => expect(message).toBe('newEmail is not a string'))
        )
        false && it('should throw error on empty newEmail', () =>
            logic.updateUser('john', 'Doe', '')
                .catch(({ message }) => expect(message).toBe('newEmail is empty or blank'))
        )
        false && it('should throw error on blank newEmail', () =>
            logic.updateUser('John', 'Doe', '      ')
                .catch(({ message }) => expect(message).toBe('newEmail is empty or blank'))
        )
        false && it('should throw error on no newPassword', () =>
            logic.updateUser('John', 'Doe', 'jd@mail.com')
                .catch(({ message }) => expect(message).toBe('newPassword is not a string'))
        )
        false && it('should throw error on empty newPassword', () =>
            logic.updateUser('john', 'Doe', 'jd@mail.com', '')
                .catch(({ message }) => expect(message).toBe('newPassword is empty or blank'))
        )
        false && it('should throw error on blank newPassword', () =>
            logic.updateUser('John', 'Doe', 'jd@mail.com', '      ')
                .catch(({ message }) => expect(message).toBe('newPassword is empty or blank'))
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
        false && it('should throw error on no id', () =>
            logic.unregisterUser()
                .catch(({ message }) => expect(message).toBe('id is not a string'))
        )
        false && it('should throw error on empty id', () =>
            logic.unregisterUser('')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )
        false && it('should throw error on blank id', () =>
            logic.unregisterUser('      ')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )
        false && it('should throw error on no email', () =>
            logic.unregisterUser('John', 'Doe')
                .catch(({ message }) => expect(message).toBe('email is not a string'))
        )
        false && it('should throw error on empty email', () =>
            logic.unregisterUser('john', 'Doe', '')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on blank email', () =>
            logic.unregisterUser('John', 'Doe', '      ')
                .catch(({ message }) => expect(message).toBe('email is empty or blank'))
        )
        false && it('should throw error on no password', () =>
            logic.unregisterUser('John', 'Doe', 'jd@mail.com')
                .catch(({ message }) => expect(message).toBe('password is not a string'))
        )
        false && it('should throw error on empty password', () =>
            logic.unregisterUser('john', 'Doe', 'jd@mail.com', '')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
        false && it('should throw error on blank password', () =>
            logic.unregisterUser('John', 'Doe', 'jd@mail.com', '      ')
                .catch(({ message }) => expect(message).toBe('password is empty or blank'))
        )
    })


    describe('add note', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return logic.addNote(id, 'my note')
                        .then(noteId => {
                            debugger
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

    describe('retrieve note', () => {
        it('should succeed on correct data', () => {

            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return User.findByIdAndUpdate(id, { $push: { notes: { text: 'hello world' } } }, { new: true })
                })
                .then(user => {
                    // console.log(user) --> user object
                    expect(user).toBeDefined()

                    expect(user.notes).toBeDefined()
                    expect(user.notes.length).toBe(1)

                    return logic.retrieveNote(user.id, user.notes[0].id)
                })
                .then(notes => {
                    expect(notes).toBeDefined()

                    expect(notes).toBeDefined()
                    expect(notes.length).toBe(1)
                    expect(notes[0].text).toBe('hello world')
                })
        })
    })

    describe('list notes', () => {
        it('should succeed on correct data', () => {

            return User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return User.findOne({ _id: id })
                })
                .then(user => {
                    const note1 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello baby' } } }, { new: true }).then(user)
                    const note2 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello world' } } }, { new: true }).then(user)
                    const note3 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello carlos' } } }, { new: true }).then(user)

                    return Promise.all([note1, note2, note3]).then((res) => {

                        return res[res.length - 1]
                    })

                })
                .then(user => {
                    expect(user).toBeDefined()

                    expect(user.notes).toBeDefined()
                    expect(user.notes.length).toBe(3)

                    return logic.listNotes(user.id, user.notes[0].id)
                })
                .then(notes => {
                    expect(notes).toBeDefined()

                    expect(notes).toBeDefined()
                    expect(notes[0].text).toBe('hello baby')
                    expect(notes[1].text).toBe('hello world')
                    expect(notes[2].text).toBe('hello carlos')
                })
        })
    })

    describe('remove note', () => {
        it('should succeed on correct data', () => {

            return User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return User.findOne({ _id: id })
                })
                .then(user => {
                    const note1 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello baby' } } }, { new: true })
                    const note2 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello world' } } }, { new: true })
                    const note3 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello carlos' } } }, { new: true })

                    return Promise.all([note1, note2, note3]).then((res) => {
                        return res[res.length - 1]
                    })

                })
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.notes).toBeDefined()
                    expect(user.notes.length).toBe(3)

                    return logic.removeNote(user.id, user.notes[0].id)
                        .then(noteRemoved => {

                            expect(noteRemoved).toBe(true)
                            expect(noteRemoved).toBeTruthy()

                            return User.findById(user.id)
                        })
                        .then(user => {
                            expect(user).toBeTruthy()
                            expect(user.notes.length).toBe(2)

                        })

                })

        })
    })

    describe('update note', () => {
        it('should succeed on correct data', () => {

            return User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return User.findOne({ _id: id })
                })
                .then(user => {
                    const note1 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello baby' } } }, { new: true })
                    const note2 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello world' } } }, { new: true })
                    const note3 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello carlos' } } }, { new: true })

                    return Promise.all([note1, note2, note3]).then((res) => {
                        return res[res.length - 1]
                    })

                })
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.notes).toBeDefined()
                    expect(user.notes.length).toBe(3)

                    return logic.updateNote(user.id, user.notes[0].id, 'this is the first note introduced')
                        .then(note => {
                            expect(note).toBe(true)
                            expect(note).toBeTruthy()

                            return User.findById(user.id)
                        })
                        .then(user => {
                            expect(user.notes[0].text).toBe('this is the first note introduced')
                        })
                })
        })
    })


    describe('find note', () => {
        it('should succeed on correct data', () => {

            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return User.findOne({ _id: id })
                })
                .then(user => {
                    const note1 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello barbie girl' } } }, { new: true })
                    const note2 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello world' } } }, { new: true })
                    const note3 = User.findByIdAndUpdate({ _id: user._id }, { $push: { notes: { text: 'hello carlos' } } }, { new: true })

                    return Promise.all([note1, note2, note3]).then((res) => {
                        return res[res.length - 1]
                    })

                })
                .then(user => {
                    // console.log(user) --> user object
                    expect(user).toBeDefined()

                    expect(user.notes).toBeDefined()
                    expect(user.notes.length).toBe(3)

                    return logic.findNotes(user.id, 'hello barbie girl')
                })
                .then(notes => {
                    expect(notes).toBeDefined()

                    expect(notes).toBeDefined()
                    expect(notes.length).toBe(1)
                    expect(notes[0].text).toBe('hello barbie girl')
                })
        })

        false && it('should throw error on no userId', () =>
            logic.findNotes()
                .catch(({ message }) => expect(message).toBe('userId is not a string'))
        )

        false && it('should throw error on empty userId', () =>
            logic.findNotes('')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        false && it('should throw error on blank userId', () =>
            logic.findNotes('     ')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        false && it('should throw error on no text', () => {
            logic.findNotes(_userId)
                .catch(({ message }) => expect(message).toBe('text is not a string'))
        })

        false && it('should throw error on empty text', () =>
            logic.findNotes(_userId, '')
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        )

        false && it('should throw error on blank text', () =>
            logic.findNotes(_userId, '   ')
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        )
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})
