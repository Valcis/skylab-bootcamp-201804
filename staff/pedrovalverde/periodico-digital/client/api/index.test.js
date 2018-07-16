'use strict'

require('dotenv').config()

const { mongoose, models: { User } } = require('data')
const { expect } = require('chai')
const logic = require('./index')
const _ = require('lodash')
const sinon = require('sinon')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const { env: { DB_URL, API_URL, TOKEN_SECRET } } = process

logic.url = API_URL

describe('logic (api-client)', () => {
    const userData = { name: 'John', surname: 'Doe', email: 'jd@mail.com',username:'jdoe',  password: '123',  birthdate:'', gender:'male', address:'', permission:'reader' }
    const otherUserData = { name: 'Jack', surname: 'Wayne', email: 'jw@mail.com', username:'jWayne', password: '456', birthdate:'', gender:'male', address:'', permission:'reader' }
    const fakeUserId = '123456781234567812345678'
    const fakeNoteId = '123456781234567812345678'
    const noteText = 'my note'
    const indexes = []

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        let count = 10 + Math.floor(Math.random() * 10)
        indexes.length = 0
        while (count--) indexes.push(count)

        return Promise.all([User.remove()]) 
        //return Promise.all([User.deleteMany()])
    })

    describe('register user', () => {
        it('should succeed on correct dada', () =>
            logic.registerUser('John', 'Doe', 'jd@mail.com', 'jdoe', '123', '', 'male', '', 'reader')
                .then(res => expect(res).to.be.true)
        )

        false && it('should fail on already registered user', () =>
            User.create(userData)
                .then(() => {
                    const { name, surname, email, password } = userData

                    return logic.registerUser(name, surname, email, password)
                })
                .catch(({ message }) => {
                    expect(message).to.equal(`user with email ${userData.email} already exists`)
                })
        )

        false && it('should fail on no user name', () =>
            logic.registerUser()
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        false && it('should fail on empty user name', () =>
            logic.registerUser('')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        false && it('should fail on blank user name', () =>
            logic.registerUser('     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        false && it('should fail on no user surname', () =>
            logic.registerUser(userData.name)
                .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
        )

        false && it('should fail on empty user surname', () =>
            logic.registerUser(userData.name, '')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        false && it('should fail on blank user surname', () =>
            logic.registerUser(userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        false && it('should fail on no user email', () =>
            logic.registerUser(userData.name, userData.surname)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        false && it('should fail on empty user email', () =>
            logic.registerUser(userData.name, userData.surname, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        false && it('should fail on blank user email', () =>
            logic.registerUser(userData.name, userData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        false && it('should fail on no user password', () =>
            logic.registerUser(userData.name, userData.surname, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        false && it('should fail on empty user password', () =>
            logic.registerUser(userData.name, userData.surname, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        false && it('should fail on blank user password', () =>
            logic.registerUser(userData.name, userData.surname, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        false && describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 201, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { name, surname, email, password } = userData

                return logic.registerUser(name, surname, email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 201 (KO)`)
                    })
            })

            it('should fail on email hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'email is not a string' } } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { name, surname, email, password } = userData

                return logic.registerUser(name, surname, email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('email is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { name, surname, email, password } = userData

                return logic.registerUser(name, surname, email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    false && describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(() =>
                    logic.authenticateUser('jd@mail.com', '123')
                        .then(id => {
                            expect(id).to.exist

                            expect(logic.token).not.to.equal('NO-TOKEN')
                        })
                )
        )

        it('should fail on no user email', () =>
            logic.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            logic.authenticateUser('')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            logic.authenticateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            logic.authenticateUser(userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.authenticateUser(userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.authenticateUser(userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 200, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = userData

                return logic.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 200 (KO)`)
                    })
            })

            it('should fail on email hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'email is not a string' } } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = userData

                return logic.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('email is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = userData

                return logic.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    false && describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    logic.token = token

                    return logic.retrieveUser(id)
                })
                .then(user => {
                    expect(user).to.exist

                    const { name, surname, email, _id, password, notes } = user

                    expect(name).to.equal('John')
                    expect(surname).to.equal('Doe')
                    expect(email).to.equal('jd@mail.com')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                    expect(notes).to.be.undefined
                })
        )

        it('should fail on no user id', () =>
            logic.retrieveUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.retrieveUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.retrieveUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 200, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return logic.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 200 (KO)`)
                    })
            })

            it('should fail on id hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'user id is not a string' } } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return logic.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal('user id is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return logic.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    false && describe('udpate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    logic.token = token

                    return logic.updateUser(id, 'Jack', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '456')
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.exist

                            const { name, surname, email, password } = user

                            expect(user.id).to.equal(id)
                            expect(name).to.equal('Jack')
                            expect(surname).to.equal('Wayne')
                            expect(email).to.equal('jw@mail.com')
                            expect(password).to.equal('456')
                        })
                })
        )

        it('should fail on changing email to an already existing user\'s email', () =>
            Promise.all([
                User.create(userData),
                User.create(otherUserData)
            ])
                .then(([{ id: id1 }, { id: id2 }]) => {
                    const token = jwt.sign({ id: id1 }, TOKEN_SECRET)

                    logic.token = token

                    const { name, surname, email, password } = userData

                    return logic.updateUser(id1, name, surname, email, password, otherUserData.email)
                })
                .catch(({ message }) => expect(message).to.equal(`user with email ${otherUserData.email} already exists`))
        )

        it('should fail on no user id', () =>
            logic.updateUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.updateUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.updateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user name', () =>
            logic.updateUser(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            logic.updateUser(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            logic.updateUser(fakeUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            logic.updateUser(fakeUserId, userData.name)
                .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            logic.updateUser(fakeUserId, userData.name, '')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            logic.updateUser(fakeUserId, userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on no user email', () =>
            logic.updateUser(fakeUserId, userData.name, userData.surname)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            logic.updateUser(fakeUserId, userData.name, userData.surname, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            logic.updateUser(fakeUserId, userData.name, userData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            logic.updateUser(fakeUserId, userData.name, userData.surname, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.updateUser(fakeUserId, userData.name, userData.surname, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.updateUser(fakeUserId, userData.name, userData.surname, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    false && describe('unregister user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    logic.token = token

                    const { email, password } = userData

                    return logic.unregisterUser(id, email, password)
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.be.null
                        })
                })
        )

        it('should fail on no user id', () =>
            logic.unregisterUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.unregisterUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.unregisterUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user email', () =>
            logic.unregisterUser(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            logic.unregisterUser(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            logic.unregisterUser(fakeUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            logic.unregisterUser(fakeUserId, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.unregisterUser(fakeUserId, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.unregisterUser(fakeUserId, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    false && describe('add note', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    logic.token = token

                    return logic.addNote(id, noteText)
                        .then(noteId => {
                            expect(noteId).to.be.a('string')
                            expect(noteId).to.exist

                            return User.findById(id)
                                .then(user => {
                                    expect(user).to.exist

                                    expect(user.notes).to.exist
                                    expect(user.notes.length).to.equal(1)

                                    const [{ id, text }] = user.notes

                                    expect(id).to.equal(noteId)
                                    expect(text).to.equal(noteText)
                                })
                        })
                })
        )

        it('should fail on wrong user id', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    logic.token = token

                    return logic.addNote(fakeUserId, noteText)
                        .catch(({ message }) => expect(message).to.equal(`user id ${fakeUserId} does not match token user id ${id}`))
                })
        )

        it('should fail on no user id', () =>
            logic.addNote()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.addNote('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.addNote('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no text', () => {
            logic.addNote(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('text is not a string'))
        })

        it('should fail on empty text', () =>
            logic.addNote(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('text is empty or blank'))
        )

        it('should fail on blank text', () =>
            logic.addNote(fakeUserId, '   ')
                .catch(({ message }) => expect(message).to.equal('text is empty or blank'))
        )
    })

    false && describe('retrieve note', () => {
        it('should succeed on correct data', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId, notes: [{ id: noteId }] }) => {
                    const token = jwt.sign({ id: userId }, TOKEN_SECRET)

                    logic.token = token

                    return logic.retrieveNote(userId, noteId)
                })
                .then(({ id, text }) => {
                    expect(id).to.equal(note.id)
                    expect(text).to.equal(note.text)
                })
        })

        it('should fail on non user id', () =>
            logic.retrieveNote()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.retrieveNote('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.retrieveNote('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on wrong user id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ notes: [{ id: noteId }] }) => {
                    const token = jwt.sign({ id: user.id }, TOKEN_SECRET)

                    logic.token = token

                    return logic.retrieveNote(fakeUserId, noteId)
                        .catch(({ message }) => expect(message).to.equal(`user id ${fakeUserId} does not match token user id ${user.id}`))
                })
        })

        it('should fail on no note id', () =>
            logic.retrieveNote(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('note id is not a string'))
        )

        it('should fail on empty note id', () =>
            logic.retrieveNote(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
        )

        it('should fail on blank note id', () =>
            logic.retrieveNote(fakeUserId, '       ')
                .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
        )

        it('should fail on wrong note id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId }) => {
                    const token = jwt.sign({ id: userId }, TOKEN_SECRET)

                    logic.token = token

                    return logic.retrieveNote(userId, fakeNoteId)
                        .catch(({ message }) => expect(message).to.equal(`no note found with id ${fakeNoteId}`))
                })
        })
    })

    false && describe('list notes', () => {
        it('should succeed on correct data', () => {
            const user = new User(userData)

            const notes = indexes.map(index => new Note({ text: `${noteText} ${index}` }))

            user.notes = notes

            return user.save()
                .then(({ id: userId, notes }) => {
                    // const validNoteIds = []
                    // const validNoteTexts = []

                    // notes.forEach(({ id, text }) => {
                    //     validNoteIds.push(id)
                    //     validNoteTexts.push(text)
                    // })
                    // or
                    const validNoteIds = _.map(notes, 'id')
                    const validNoteTexts = _.map(notes, 'text')

                    const token = jwt.sign({ id: userId }, TOKEN_SECRET)

                    logic.token = token

                    return logic.listNotes(userId)
                        .then(notes => {
                            expect(notes).to.exist
                            expect(notes.length).to.equal(indexes.length)

                            notes.forEach(({ id, text, _id }) => {
                                // expect(validNoteIds.includes(id)).to.be.true
                                // expect(validNoteTexts.includes(text)).to.be.true
                                // or
                                expect(validNoteIds).to.include(id)
                                expect(validNoteTexts).to.include(text)
                                expect(_id).not.to.exist
                            })
                        })
                })
        })

        it('should fail on non user id', () =>
            logic.listNotes()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.listNotes('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.listNotes('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )
    })

    false && describe('update note', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id: userId }) =>
                    User.findByIdAndUpdate(userId, { $push: { notes: { text: noteText } } }, { new: true })
                        .then(user => {
                            const noteId = user.notes[user.notes.length - 1].id

                            const newNoteText = `${noteText} 2`

                            const token = jwt.sign({ id: user.id }, TOKEN_SECRET)

                            logic.token = token

                            return logic.updateNote(userId, noteId, newNoteText)
                                .then(res => {
                                    expect(res).to.be.true

                                    return User.findById(userId)
                                })
                                .then(({ notes }) => {
                                    const [{ id, text }] = notes

                                    expect(id).to.equal(noteId)
                                    expect(text).to.equal(newNoteText)
                                })
                        })
                )
        )

        it('should fail on non user id', () =>
            logic.updateNote()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.updateNote('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.updateNote('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on wrong user id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ notes: [{ id: noteId }] }) => {
                    const token = jwt.sign({ id: user.id }, TOKEN_SECRET)

                    logic.token = token

                    return logic.updateNote(fakeUserId, noteId, `${noteText} 2`)
                        .catch(({ message }) => expect(message).to.equal(`user id ${fakeUserId} does not match token user id ${user.id}`))
                })
        })

        it('should fail on wrong note id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId }) => {
                    const token = jwt.sign({ id: user.id }, TOKEN_SECRET)

                    logic.token = token

                    return logic.updateNote(userId, fakeNoteId, `${noteText} 2`)
                        .catch(({ message }) => expect(message).to.equal(`no note found with id ${fakeNoteId}`))
                })
        })
    })

    false && describe('remove note', () => {
        it('should succeed on correct data', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId, notes: [{ id: noteId }] }) => {
                    const token = jwt.sign({ id: userId }, TOKEN_SECRET)

                    logic.token = token

                    return logic.removeNote(userId, noteId)
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(userId)
                        })
                        .then(({ notes }) => {
                            expect(notes).to.exist
                            expect(notes.length).to.equal(0)
                        })
                })
        })

        it('should fail on non user id', () =>
            logic.removeNote()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.removeNote('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.removeNote('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on wrong user id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ notes: [{ id: noteId }] }) => {
                    const token = jwt.sign({ id: user.id }, TOKEN_SECRET)

                    logic.token = token

                    return logic.removeNote(fakeUserId, noteId)
                        .catch(({ message }) => expect(message).to.equal(`user id ${fakeUserId} does not match token user id ${user.id}`))
                })
        })

        it('should fail on no note id', () =>
            logic.removeNote(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('note id is not a string'))
        )

        it('should fail on empty note id', () =>
            logic.removeNote(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
        )

        it('should fail on blank note id', () =>
            logic.removeNote(fakeUserId, '       ')
                .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
        )

        it('should fail on wrong note id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId }) => {
                    const token = jwt.sign({ id: userId }, TOKEN_SECRET)

                    logic.token = token

                    return logic.removeNote(userId, fakeNoteId)
                        .catch(({ message }) => expect(message).to.equal(`no note found with id ${fakeNoteId}`))
                })
        })
    })

    false && describe('find notes', () => {
        it('should succeed on correct data', () => {
            const user = new User(userData)

            user.notes.push(new Note({ text: `${noteText} a` }))
            user.notes.push(new Note({ text: `${noteText} ab` }))
            user.notes.push(new Note({ text: `${noteText} abc` }))
            user.notes.push(new Note({ text: `${noteText} bc` }))
            user.notes.push(new Note({ text: `${noteText} c` }))

            const text = 'ab'

            return user.save()
                .then(({ id: userId, notes }) => {
                    const matchingNotes = notes.filter(note => note.text.includes(text))

                    const validNoteIds = _.map(matchingNotes, 'id')
                    const validNoteTexts = _.map(matchingNotes, 'text')

                    const token = jwt.sign({ id: userId }, TOKEN_SECRET)

                    logic.token = token

                    return logic.findNotes(userId, text)
                        .then(notes => {
                            expect(notes).to.exist
                            expect(notes.length).to.equal(matchingNotes.length)

                            notes.forEach(({ id, text, _id }) => {
                                // expect(validNoteIds.includes(id)).to.be.true
                                // expect(validNoteTexts.includes(text)).to.be.true
                                // or
                                expect(validNoteIds).to.include(id)
                                expect(validNoteTexts).to.include(text)
                                expect(_id).not.to.exist
                            })
                        })
                })
        })

        it('should fail on non user id', () =>
            logic.findNotes()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.findNotes('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.findNotes('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no text', () =>
            logic.findNotes(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('text is not a string'))
        )

        it('should fail on empty text', () =>
            logic.findNotes(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('text is empty'))
        )
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})