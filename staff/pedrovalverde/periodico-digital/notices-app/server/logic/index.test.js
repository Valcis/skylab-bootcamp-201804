'use strict'

require('dotenv').config()

const { mongoose, models: { User, Note, Comment, News } } = require('data')
const { expect } = require('chai')
const logic = require('.')
const _ = require('lodash')

const { env: { DB_URL } } = process

describe('logic (BBDD persistence)', () => {

  const dummyUserId = '123456781234567812345678'
  const dummyNoteId = '123456781234567812345678'
  const dummyNewsId = '123456781234567812345678'

  const userData = { name: 'John', surname: 'Doe', email: 'jd@mail.com', username: 'jhony2', password: '123', birthdate: '', gender: 'male', address: 'anyDirection', permission: 'reader' }
  const otherUserData = { name: 'Jack', surname: 'Wayne', email: 'jw@mail.com', username: 'jWayne', password: '456', birthdate: '', gender: 'male', address: '', permission: 'editor' }
  const commentData = { userId: dummyUserId, newsId: dummyNewsId, content: "comment content", isDeleted: false }
  const newsData = { title: 'titulo', subtitle: '', summary: 'resumen', complete: 'noticia completa', category: 'portada', from: 'RSS', comments: [] }

  const indexes = []

  before(() => mongoose.connect(DB_URL))

  beforeEach(() => {
    let count = 10 + Math.floor(Math.random() * 10)
    indexes.length = 0
    while (count--) indexes.push(count)

    return Promise.all([User.remove()/*, Note.deleteMany()*/])
  })
//TESTING USERS DATA BASE
  false && describe('register user', () => {

    it('should succeed on correct data', () =>
      logic.registerUser('John', 'Doe', 'jd@mail.com', 'jhony', '123', '', 'male', 'anyDirection', 'reader')
        .then(res => expect(res).to.be.true)
    )

    it('should fail on no user name', () =>
      logic.registerUser()
        .catch(({ message }) => expect(message).to.equal('user name is not a string'))
    )

    it('should fail on empty user name', () =>
      logic.registerUser('')
        .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
    )

    it('should fail on blank user name', () =>
      logic.registerUser('     ')
        .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
    )

    it('should fail on no user surname', () =>
      logic.registerUser(userData.name)
        .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
    )

    it('should fail on empty user surname', () =>
      logic.registerUser(userData.name, '')
        .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
    )

    it('should fail on blank user surname', () =>
      logic.registerUser(userData.name, '     ')
        .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
    )

    it('should fail on no user email', () =>
      logic.registerUser(userData.name, userData.surname)
        .catch(({ message }) => expect(message).to.equal('user email is not a string'))
    )

    it('should fail on empty user email', () =>
      logic.registerUser(userData.name, userData.surname, '')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on blank user email', () =>
      logic.registerUser(userData.name, userData.surname, '     ')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on already user email registered', () =>
      User.create(userData)
        .then(() => {
          const { name, surname, email, username, password, birthdate, gender, address, permission } = userData

          return logic.registerUser(name, surname, email, "username", password, birthdate, gender, address, permission)
        })
        .catch(({ message }) => {
          expect(message).to.equal(`E11000 duplicate key error collection: periodico-test.users index: email_1 dup key: { : "${userData.email}" }`)
        })
    )

    it('should fail on no user username', () =>
      logic.registerUser(userData.name, userData.surname, userData.email)
        .catch(({ message }) => expect(message).to.equal('user username is not a string'))
    )

    it('should fail on empty user username', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, '')
        .catch(({ message }) => expect(message).to.equal('user username is empty or blank'))
    )

    it('should fail on blank user username', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, '     ')
        .catch(({ message }) => expect(message).to.equal('user username is empty or blank'))
    )

    it('should fail on already username registered', () =>
      User.create(userData)
        .then(() => {
          const { name, surname, email, username, password, birthdate, gender, address, permission } = userData

          return logic.registerUser(name, surname, "email@algo.com", username, password, birthdate, gender, address, permission)
        })
        .catch(({ message }) => {
          expect(message).to.equal(`E11000 duplicate key error collection: periodico-test.users index: username_1 dup key: { : "${userData.username}" }`)
        })
    )

    it('should fail on no user password', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username)
        .catch(({ message }) => expect(message).to.equal('user password is not a string'))
    )

    it('should fail on empty user password', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, '')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )

    it('should fail on blank user password', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, '     ')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )

    it('should fail on wrong user birthdate', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, userData.password, "noDate")
        .catch(({ message }) => expect(message).to.equal('user birthdate is not a date'))
    )

    it('should fail on blank user gender', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, '    ')
        .catch(({ message }) => expect(message).to.equal('user gender value not admited'))
    )

    it('should fail on wrong user gender', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, 'notFromEnumOptions')
        .catch(({ message }) => expect(message).to.equal('user gender value not admited'))
    )

    it('should fail on wrong user address type', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, [1, 2])
        .catch(({ message }) => expect(message).to.equal('user address is not a string'))
    )

    it('should fail on no user permission', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, userData.address)
        .catch(({ message }) => expect(message).to.equal('user permission is not a string'))
    )

    it('should fail on blank user permission', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, userData.address, '   ')
        .catch(({ message }) => expect(message).to.equal('user permission value not admited'))
    )

    it('should fail on wrong user permission', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, userData.address, 'notFromEnumOptions')
        .catch(({ message }) => expect(message).to.equal('user permission value not admited'))
    )
  }) // DONE -> its OK

  false && describe('authenticate user', () => {

    it('should succeed on correct data', () =>
      User.create(userData)
        .then(() =>
          logic.authenticateUser('jd@mail.com', '123')
            .then(id => expect(id).to.exist)
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
  }) // DONE -> its OK

  false && describe('retrieve user', () => {

    it('should succeed on correct data', () =>
      User.create(userData)
        .then(({ id }) => {
          return logic.retrieveUser(id)
        })
        .then(user => {
          expect(user).to.exist

          const { name, surname, email, username, password, birthdate, gender, address, permission } = user

          expect(name).to.equal('John')
          expect(surname).to.equal('Doe')
          expect(email).to.equal('jd@mail.com')
          expect(username).to.equal('jhony2')
          expect(password).to.equal('123')
          expect(birthdate).to.equal(null)
          expect(gender).to.equal('male')
          expect(address).to.equal('anyDirection')
          expect(permission).to.equal('reader')
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
  }) // DONE -> its OK

  false && describe('udpate user', () => {

    it('should succeed on correct data', () =>
      User.create(userData)
        .then(({ id }) => {
          return logic.updateUser(id, 'Jack', 'Wayne', 'jd@mail.com', 'jWayne', '123', '', 'male', '', 'editor', 'jw@mail.com', '456')
            .then(res => {
              expect(res).to.be.true

              return User.findById(id)
            })
            .then(user => {
              expect(user).to.exist

              const { name, surname, email, username, password, birthdate, gender, address, permission } = user

              expect(user.id).to.equal(id)
              expect(name).to.equal('Jack')
              expect(surname).to.equal('Wayne')
              expect(email).to.equal('jw@mail.com')
              expect(username).to.equal('jWayne')
              expect(password).to.equal('456')
              expect(birthdate).to.equal(null)
              expect(gender).to.equal('male')
              expect(address).to.equal('')
              expect(permission).to.equal('editor')
            })
        })
    )

    it('should fail on changing email to an already existing user\'s email', () =>
      Promise.all([
        User.create(userData),
        User.create(otherUserData)
      ])
        .then(([{ id: id1 }, { id: id2 }]) => {
          const { name, surname, email, username, password, birthdate, gender, address, permission } = userData

          return logic.updateUser(id1, name, surname, email, username, password, birthdate, gender, address, permission, otherUserData.email, otherUserData.password)
        })
        .catch(({ message }) => expect(message).to.equal(`E11000 duplicate key error collection: periodico-test.users index: email_1 dup key: { : "${otherUserData.email}" }`))
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
      logic.updateUser(dummyUserId)
        .catch(({ message }) => expect(message).to.equal('user name is not a string'))
    )

    it('should fail on empty user name', () =>
      logic.updateUser(dummyUserId, '')
        .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
    )

    it('should fail on blank user name', () =>
      logic.updateUser(dummyUserId, '     ')
        .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
    )

    it('should fail on no user surname', () =>
      logic.updateUser(dummyUserId, userData.name)
        .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
    )

    it('should fail on empty user surname', () =>
      logic.updateUser(dummyUserId, userData.name, '')
        .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
    )

    it('should fail on blank user surname', () =>
      logic.updateUser(dummyUserId, userData.name, '     ')
        .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
    )

    it('should fail on no user email', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname)
        .catch(({ message }) => expect(message).to.equal('user email is not a string'))
    )

    it('should fail on empty user email', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, '')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on blank user email', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, '     ')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on no user username', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email)
        .catch(({ message }) => expect(message).to.equal('user username is not a string'))
    )

    it('should fail on empty user username', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, '')
        .catch(({ message }) => expect(message).to.equal('user username is empty or blank'))
    )

    it('should fail on blank user username', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, '     ')
        .catch(({ message }) => expect(message).to.equal('user username is empty or blank'))
    )

    it('should fail on no user password', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username)
        .catch(({ message }) => expect(message).to.equal('user password is not a string'))
    )

    it('should fail on empty user password', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, '')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )

    it('should fail on blank user password', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, '     ')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )

    it('should fail on wrong user birthdate', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, userData.password, "noDate")
        .catch(({ message }) => expect(message).to.equal('user birthdate is not a date'))
    )

    it('should fail on blank user gender', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, '    ')
        .catch(({ message }) => expect(message).to.equal('user gender value not admited'))
    )

    it('should fail on wrong user gender', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, 'notFromEnumOptions')
        .catch(({ message }) => expect(message).to.equal('user gender value not admited'))
    )

    it('should fail on wrong user address type', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, [1, 2])
        .catch(({ message }) => expect(message).to.equal('user address is not a string'))
    )

    it('should fail on no user permission', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, userData.address)
        .catch(({ message }) => expect(message).to.equal('user permission is not a string'))
    )

    it('should fail on blank user permission', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, userData.address, '   ')
        .catch(({ message }) => expect(message).to.equal('user permission value not admited'))
    )

    it('should fail on wrong user permission', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, userData.address, 'notFromEnumOptions')
        .catch(({ message }) => expect(message).to.equal('user permission value not admited'))
    )
  }) // DONE -> its OK

  false && describe('unregister user', () => {

    /* it('should succeed on correct data', () =>
      User.create(userData)
        .then(({ id }) => { console.log("mira : ",id)
          return logic.unregisterUser(id, 'jd@mail.com', '123')
            .then(res => {
              expect(res).to.be.true

              return User.findById(id)
            })
            .then(user => {
              expect(user).to.be.null
            })
        })
    ) */

    it('should succeed on correct data', () =>
      User.create(userData)
        .then(({ id }) => {
          return logic.unregisterUser(id, 'jd@mail.com', '123')
            .then(res => {
              expect(res).to.be.true
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
      logic.unregisterUser(dummyUserId)
        .catch(({ message }) => expect(message).to.equal('user email is not a string'))
    )

    it('should fail on empty user email', () =>
      logic.unregisterUser(dummyUserId, '')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on blank user email', () =>
      logic.unregisterUser(dummyUserId, '     ')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on no user password', () =>
      logic.unregisterUser(dummyUserId, userData.email)
        .catch(({ message }) => expect(message).to.equal('user password is not a string'))
    )

    it('should fail on empty user password', () =>
      logic.unregisterUser(dummyUserId, userData.email, '')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )

    it('should fail on blank user password', () =>
      logic.unregisterUser(dummyUserId, userData.email, '     ')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )
  }) // DONE -> its OK

//TESTING NEWS DATA BASE
  false && describe('add news', () => {
    
    it('should succeed on correct data', () =>

      logic.addNews('titulo', '', 'resumen', 'noticia completa', 'portada', 'RSS', [])
        .then(res => expect(res).to.be.true)
    )

    it('should fail on no title', () =>
      logic.addNews()
        .catch(({ message }) => expect(message).to.equal('title is not a string'))
    )

    it('should fail on empty title', () =>
      logic.addNews('')
        .catch(({ message }) => expect(message).to.equal('title is empty or blank'))
    )

    it('should fail on blank title', () =>
      logic.addNews('     ')
        .catch(({ message }) => expect(message).to.equal('title is empty or blank'))
    )

    it('should fail on no subtitle', () =>
      logic.addNews(newsData.title)
        .catch(({ message }) => expect(message).to.equal('subtitle is not a string'))
    )

    it('should fail on wrong subtitle type', () =>
      logic.addNews(newsData.title, [1,2])
        .catch(({ message }) => expect(message).to.equal('subtitle is not a string'))
    )

    it('should fail on no summary', () =>
      logic.addNews(newsData.title, newsData.subtitle)
        .catch(({ message }) => expect(message).to.equal('summary is not a string'))
    )

    it('should fail on empty summary', () =>
      logic.addNews(newsData.title, newsData.subtitle, '')
        .catch(({ message }) => expect(message).to.equal('summary is empty or blank'))
    )

    it('should fail on blank summary', () =>
      logic.addNews(newsData.title, newsData.subtitle, '     ')
        .catch(({ message }) => expect(message).to.equal('summary is empty or blank'))
    )

    it('should fail on no complete', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary)
        .catch(({ message }) => expect(message).to.equal('complete is not a string'))
    )

    it('should fail on empty complete', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, '')
        .catch(({ message }) => expect(message).to.equal('complete is empty or blank'))
    )

    it('should fail on blank complete', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, '     ')
        .catch(({ message }) => expect(message).to.equal('complete is empty or blank'))
    )

    it('should fail on no category', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete)
        .catch(({ message }) => expect(message).to.equal('category is not a string'))
    )

    it('should fail on empty category', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete, '')
        .catch(({ message }) => expect(message).to.equal('category is empty or blank'))
    )

    it('should fail on blank category', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete, '     ')
        .catch(({ message }) => expect(message).to.equal('category is empty or blank'))
    )

    it('should fail on wrong category', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete, "other")
        .catch(({ message }) => expect(message).to.equal('news category value not admited'))
    )

    it('should fail on no from', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete, newsData.category)
        .catch(({ message }) => expect(message).to.equal('from is not a string'))
    )

    it('should fail on empty from', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete, newsData.category, '')
        .catch(({ message }) => expect(message).to.equal('from is empty or blank'))
    )

    it('should fail on blank from', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete, newsData.category, '     ')
        .catch(({ message }) => expect(message).to.equal('from is empty or blank'))
    )

    it('should fail on no comments array', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete, newsData.category, newsData.from)
        .catch(({ message }) => expect(message).to.equal('comments is not an array'))
    )

    it('should fail on empty comments array', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete, newsData.category, newsData.from, '')
        .catch(({ message }) => expect(message).to.equal('comments is not an array'))
    )

    it('should fail on blank comments array', () =>
      logic.addNews(newsData.title, newsData.subtitle, newsData.summary, newsData.complete, newsData.category, newsData.from, '     ')
        .catch(({ message }) => expect(message).to.equal('comments is not an array'))
    )

  })












//TESTING COMMENTS DATA BASE
  false && describe('add comment', () => {

    /* it('should succeed on correct data', () =>
      User.create(userData)
        .then(({ id }) => {
          return logic.addNote(id, noteText)
            .then(noteId => {
              // expect(typeof noteId).to.equal('string')
              // or
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
    ) */

    it('should succeed on correct data', () =>
      User.create(userData)
        .then(({ id }) => {
          return logic.addNote(id, noteText)
            .then(noteId => {
              // expect(typeof noteId).to.equal('string')
              // or
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

    it('should fail on wrong user id', () => {
      return logic.addNote(dummyUserId, noteText)
        .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyUserId}`))
    })

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
      logic.addNote(dummyUserId)
        .catch(({ message }) => expect(message).to.equal('text is not a string'))
    })

    it('should fail on empty text', () =>
      logic.addNote(dummyUserId, '')
        .catch(({ message }) => expect(message).to.equal('text is empty or blank'))
    )

    it('should fail on blank text', () =>
      logic.addNote(dummyUserId, '   ')
        .catch(({ message }) => expect(message).to.equal('text is empty or blank'))
    )
  })

  false && describe('retrieve comment', () => {
    it('should succeed on correct data', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ id: userId, notes: [{ id: noteId }] }) => {
          return logic.retrieveNote(userId, noteId)
        })
        .then(({ id, text, _id }) => {
          expect(id).to.equal(note.id)
          expect(text).to.equal(note.text)
          expect(_id).not.to.exist
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
          return logic.retrieveNote(dummyUserId, noteId)
            .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyUserId}`))
        })
    })

    it('should fail on no note id', () =>
      logic.retrieveNote(dummyUserId)
        .catch(({ message }) => expect(message).to.equal('note id is not a string'))
    )

    it('should fail on empty note id', () =>
      logic.retrieveNote(dummyUserId, '')
        .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
    )

    it('should fail on blank note id', () =>
      logic.retrieveNote(dummyUserId, '       ')
        .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
    )

    it('should fail on wrong note id', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ id: userId }) => {
          return logic.retrieveNote(userId, dummyNoteId)
            .catch(({ message }) => expect(message).to.equal(`no note found with id ${dummyNoteId}`))
        })
    })
  })

  false && describe('list comment', () => {
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

  false && describe('update comment', () => {
    it('should succeed on correct data', () =>
      User.create(userData)
        .then(({ id: userId }) =>
          User.findByIdAndUpdate(userId, { $push: { notes: { text: noteText } } }, { new: true })
            .then(user => {
              const noteId = user.notes[user.notes.length - 1].id

              const newNoteText = `${noteText} 2`

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
          return logic.updateNote(dummyUserId, noteId, `${noteText} 2`)
            .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyUserId}`))
        })
    })

    it('should fail on wrong note id', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ id: userId }) => {
          return logic.updateNote(userId, dummyNoteId, `${noteText} 2`)
            .catch(({ message }) => expect(message).to.equal(`no note found with id ${dummyNoteId}`))
        })
    })
  })

  false && describe('remove comment', () => {
    it('should succeed on correct data', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ id: userId, notes: [{ id: noteId }] }) => {
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
          return logic.removeNote(dummyUserId, noteId)
            .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyUserId}`))
        })
    })

    it('should fail on no note id', () =>
      logic.removeNote(dummyUserId)
        .catch(({ message }) => expect(message).to.equal('note id is not a string'))
    )

    it('should fail on empty note id', () =>
      logic.removeNote(dummyUserId, '')
        .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
    )

    it('should fail on blank note id', () =>
      logic.removeNote(dummyUserId, '       ')
        .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
    )

    it('should fail on wrong note id', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ id: userId }) => {
          return logic.removeNote(userId, dummyNoteId)
            .catch(({ message }) => expect(message).to.equal(`no note found with id ${dummyNoteId}`))
        })
    })
  })

  false && describe('find comment', () => {
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
      logic.findNotes(dummyUserId)
        .catch(({ message }) => expect(message).to.equal('text is not a string'))
    )

    it('should fail on empty text', () =>
      logic.findNotes(dummyUserId, '')
        .catch(({ message }) => expect(message).to.equal('text is empty'))
    )
  })

  after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})
