'use strict'

require('dotenv').config()

const { mongoose, models: { User, Comment, News } } = require('data')
const { expect } = require('chai')
const logic = require('.')
const _ = require('lodash')

const { env: { DB_URL } } = process

describe('logic (BBDD persistence)', () => {

  const dummyUserId = '123456781234567812345678'

  const userData = { name: 'John', surname: 'Doe', email: 'jd@mail.com', username: 'jhony2', password: '123', birthdate: '', gender: 'male', address: 'anyDirection', permission: 'reader' }
  const otherUserData = { name: 'Jack', surname: 'Wayne', email: 'jw@mail.com', username: 'jWayne', password: '456', birthdate: '', gender: 'male', address: '', permission: 'editor' }
  const newsData = { newsId: '20181607111111', title: 'titulo', picture: '', summary: 'resumen', content: 'noticia completa', category: ['portada'], link: '', pubDate: '2018-16-07 11:11:11', from: 'RSS', comments: [] }
  const otherNewsData = { newsId: '20181607222222', title: 'titulo2', picture: '222', summary: 'resumen2', content: 'noticia completa22', category: ['portada', 'other'], link: '222', pubDate: '2018-16-07 22:22:22', from: 'valcis', isDeleted: false, comments: ["un comentario"] }


  const indexes = []

  before(() => mongoose.connect(DB_URL))

  beforeEach(() => {
    let count = 10 + Math.floor(Math.random() * 10)
    indexes.length = 0
    while (count--) indexes.push(count)

    return Promise.all([User.remove(), News.remove()])
  })

  //TESTING USERS DATA BASE
  false && describe('register user', () => {

    it('should succeed on correct data', () =>
      logic.registerUser('John', 'Doe', 'jd@mail.com', 'jhony', '123', '2018-06-17T18:16:10.456Z', '', 'anyDirection', 'reader')
        .then(res => expect(res).to.be.true)
    )

    it('should fail on no user\'s name', () =>
      logic.registerUser()
        .catch(({ message }) => expect(message).to.equal('user name is not a string'))
    )

    it('should fail on empty user\'s name', () =>
      logic.registerUser('')
        .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
    )

    it('should fail on blank user\'s name', () =>
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
          const { name, surname, email, password, birthdate, gender, address, permission } = userData

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
          const { name, surname, username, password, birthdate, gender, address, permission } = userData

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
        .catch(({ message }) => expect(message).to.equal('user birthdate has not valid format'))
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
        .catch(({ message }) => expect(message).to.equal('user permission is empty or blank'))
    )

    it('should fail on wrong user permission', () =>
      logic.registerUser(userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, userData.address, 'notFromEnumOptions')
        .catch((mierda) => expect(mierda.message).to.equal('user permission value not admited')
        )
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

    it('should fail on no user\'s name', () =>
      logic.updateUser(dummyUserId)
        .catch(({ message }) => expect(message).to.equal('user name is not a string'))
    )

    it('should fail on empty user\'s name', () =>
      logic.updateUser(dummyUserId, '')
        .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
    )

    it('should fail on blank user\'s name', () =>
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
        .catch(({ message }) => expect(message).to.equal('user birthdate has not valid format'))
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
        .catch(({ message }) => expect(message).to.equal('user permission is empty or blank'))
    )

    it('should fail on wrong user permission', () =>
      logic.updateUser(dummyUserId, userData.name, userData.surname, userData.email, userData.username, userData.password, userData.birthdate, userData.gender, userData.address, 'notFromEnumOptions')
        .catch(({ message }) => expect(message).to.equal('user permission value not admited'))
    )
  }) // DONE -> its OK 

  false && describe('unregister user', () => {

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

  //TESTING EXTERN NEWS API
  //se testea aparte


  //TESTING NEWS DATA BASE
  false && describe('add news', () => {

    it('should succeed on correct data', () =>
      logic.addNews('titulo', '', 'resumen', 'noticia completa', ['portada'], 'link', '2018-16-07 11:11:11', 'RSS', [])
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

    it('should fail on wrong picture type', () =>
      logic.addNews(newsData.title, [1, 2])
        .catch(({ message }) => expect(message).to.equal('picture is not a string'))
    )

    it('should fail on no summary', () =>
      logic.addNews(newsData.title, newsData.picture)
        .catch(({ message }) => expect(message).to.equal('summary is not a string'))
    )

    it('should fail on empty summary', () =>
      logic.addNews(newsData.title, newsData.picture, '')
        .catch(({ message }) => expect(message).to.equal('summary is empty or blank'))
    )

    it('should fail on blank summary', () =>
      logic.addNews(newsData.title, newsData.picture, '     ')
        .catch(({ message }) => expect(message).to.equal('summary is empty or blank'))
    )

    it('should fail on no content', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary)
        .catch(({ message }) => expect(message).to.equal('content is not a string'))
    )

    it('should fail on empty content', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, '')
        .catch(({ message }) => expect(message).to.equal('content is empty or blank'))
    )

    it('should fail on blank content', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, '     ')
        .catch(({ message }) => expect(message).to.equal('content is empty or blank'))
    )

    it('should fail on no category', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content)
        .catch(({ message }) => expect(message).to.equal('category is not an array'))
    )

    it('should fail on empty category', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, [])
        .catch(({ message }) => expect(message).to.equal('category is empty'))
    )

    it('should fail on wrong type of category values', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, [1, 2])
        .catch(({ message }) => expect(message).to.equal('some categorys value are not a string'))
    )

    it('should fail on blank category values', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, ['', '    '])
        .catch(({ message }) => expect(message).to.equal('some categorys value are blank'))
    )

    it('should fail on to much categorys', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, ["a", "b", "c", "d", "e"])
        .catch(({ message }) => expect(message).to.equal('category has more tan 4 values'))
    )

    it('should fail on no link', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category)
        .catch(({ message }) => expect(message).to.equal('link is not a string'))
    )

    it('should fail on wrong link type', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, ["error"])
        .catch(({ message }) => expect(message).to.equal('link is not a string'))
    )

    it('should fail on no pubDate', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link)
        .catch(({ message }) => expect(message).to.equal('pubDate is not a string'))
    )

    it('should fail on empty pubDate', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, '')
        .catch(({ message }) => expect(message).to.equal('pubDate is empty or blank'))
    )

    it('should fail on empty pubDate', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, '     ')
        .catch(({ message }) => expect(message).to.equal('pubDate is empty or blank'))
    )

    it('should fail on no from', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate)
        .catch(({ message }) => expect(message).to.equal('from is not a string'))
    )

    it('should fail on empty from', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, '')
        .catch(({ message }) => expect(message).to.equal('from is empty or blank'))
    )

    it('should fail on blank from', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, '     ')
        .catch(({ message }) => expect(message).to.equal('from is empty or blank'))
    )

    it('should fail on no comments array', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, newsData.from)
        .catch(({ message }) => expect(message).to.equal('comments is not an array'))
    )

    it('should fail on wrong comments type', () =>
      logic.addNews(newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, newsData.from, 'error')
        .catch(({ message }) => expect(message).to.equal('comments is not an array'))
    )
  }) // DONE -> its OK

  false && describe('retrieve news', () => {

    it('should succeed on correct data', () =>
      News.create(newsData)
        .then(({ newsId }) => {
          return logic.retrieveNews(newsId)
        })
        .then(news => {
          expect(news).to.exist

          const { title, picture, summary, content, category, link, pubDate, from, comments } = news

          expect(title).to.equal('titulo')
          expect(picture).to.equal('')
          expect(summary).to.equal('resumen')
          expect(content).to.equal('noticia completa')
          expect(category[0]).to.equal('portada')
          expect(link).to.equal('')
          expect(pubDate).to.equal('2018-16-07 11:11:11')
          expect(from).to.equal('RSS')
          expect(comments).to.empty
        })
    )

    it('should fail on no newsId', () =>
      logic.retrieveNews()
        .catch(({ message }) => expect(message).to.equal('newsId is not a string'))
    )

    it('should fail on empty newsId', () =>
      logic.retrieveNews('')
        .catch(({ message }) => expect(message).to.equal('newsId is empty or blank'))
    )

    it('should fail on blank newsId', () =>
      logic.retrieveNews('     ')
        .catch(({ message }) => expect(message).to.equal('newsId is empty or blank'))
    )

    it('should fail on wrong newsId', () =>
      logic.retrieveNews('20181111121212')
        .catch(({ message }) => expect(message).to.equal('No news with newsId : 20181111121212'))
    )
  }) // DONE -> its OK

  false && describe('exist this newsId', () => {

    it('should succeed on correct data', () =>
      News.create(newsData)
        .then(({ newsId }) => {
          return logic.existItem(newsId)
        })
        .then(item => {
          expect(item).to.be.true
        })
    )

    it('should fail on no newsId', () =>
      logic.existItem()
        .catch(({ message }) => expect(message).to.equal('newsId is not a string'))
    )

    it('should fail on empty newsId', () =>
      logic.existItem('')
        .catch(({ message }) => expect(message).to.equal('newsId is empty or blank'))
    )

    it('should fail on blank newsId', () =>
      logic.existItem('     ')
        .catch(({ message }) => expect(message).to.equal('newsId is empty or blank'))
    )

    it('should fail on wrong newsId', () =>
      logic.existItem('20181111121212')
        .then(item => expect(item).to.be.false)
    )
  }) // DONE -> its OK

  false && describe('udpate news', () => {

    it('should succeed on correct data', () =>
      News.create(newsData)
        .then(({ newsId }) => {
          return logic.updateNews(newsId, 'titulo2', '2', 'resumen2', 'noticia completa2', ['portada', '2'], 'link2', '2018-16-07 11:11:11', 'valcis', false, ["un comentario"])
            .then(res => {
              expect(res).to.be.true

              return News.findOne({ newsId })
            })
            .then(news => {
              expect(news).to.exist

              const { newsId, title, picture, summary, content, category, link, pubDate, from, isDeleted, comments } = news

              expect(newsId).to.equal('20181607111111')
              expect(title).to.equal('titulo2')
              expect(picture).to.equal('2')
              expect(summary).to.equal('resumen2')
              expect(content).to.equal('noticia completa2')
              expect(category[0]).to.equal('portada')
              expect(category[1]).to.equal('2')
              expect(link).to.equal('link2')
              expect(pubDate).to.equal('2018-16-07 11:11:11')
              expect(from).to.equal('valcis')
              expect(isDeleted).to.be.false
              expect(comments[0]).to.equal('un comentario')
            })
        })
    )

    it('should fail on no newsId', () =>
      logic.updateNews()
        .catch(({ message }) => expect(message).to.equal('news newsId is not a string'))
    )

    it('should fail on empty newsId', () =>
      logic.updateNews('')
        .catch(({ message }) => expect(message).to.equal('news newsId is empty or blank'))
    )

    it('should fail on blank newsId', () =>
      logic.updateNews('     ')
        .catch(({ message }) => expect(message).to.equal('news newsId is empty or blank'))
    )

    it('should fail on no news title', () =>
      logic.updateNews(newsData.newsId)
        .catch(({ message }) => expect(message).to.equal('title is not a string'))
    )

    it('should fail on empty new\'s title', () =>
      logic.updateNews(newsData.newsId, '')
        .catch(({ message }) => expect(message).to.equal('title is empty or blank'))
    )

    it('should fail on blank new\'s title', () =>
      logic.updateNews(newsData.newsId, '     ')
        .catch(({ message }) => expect(message).to.equal('title is empty or blank'))
    )

    it('should fail on no picture', () =>
      logic.updateNews(newsData.newsId, newsData.title)
        .catch(({ message }) => expect(message).to.equal('picture is not a string'))
    )

    it('should fail on no summary', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture)
        .catch(({ message }) => expect(message).to.equal('summary is not a string'))
    )

    it('should fail on empty summary', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, '')
        .catch(({ message }) => expect(message).to.equal('summary is empty or blank'))
    )

    it('should fail on blank summary', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, '     ')
        .catch(({ message }) => expect(message).to.equal('summary is empty or blank'))
    )

    it('should fail on no content', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary)
        .catch(({ message }) => expect(message).to.equal('content is not a string'))
    )

    it('should fail on empty content', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, '')
        .catch(({ message }) => expect(message).to.equal('content is empty or blank'))
    )

    it('should fail on blank content', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, '     ')
        .catch(({ message }) => expect(message).to.equal('content is empty or blank'))
    )

    it('should fail on no category', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content)
        .catch(({ message }) => expect(message).to.equal('category is not an array'))
    )

    it('should fail on empty category', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, [])
        .catch(({ message }) => expect(message).to.equal('category is empty'))
    )

    it('should fail on blank category', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, [1, 2])
        .catch(({ message }) => expect(message).to.equal('some categorys value are not a string'))
    )
    it('should fail on blank category values', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, ['', '    '])
        .catch(({ message }) => expect(message).to.equal('some categorys value are blank'))
    )

    it('should fail on to much categorys', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, ["a", "b", "c", "d", "e"])
        .catch(({ message }) => expect(message).to.equal('category has more tan 4 values'))
    )

    it('should fail on no link', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category)
        .catch(({ message }) => expect(message).to.equal('link is not a string'))
    )

    it('should fail on no pubDate', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link)
        .catch(({ message }) => expect(message).to.equal('pubDate is not a string'))
    )

    it('should fail on empty pubDate', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, '')
        .catch(({ message }) => expect(message).to.equal('pubDate is empty or blank'))
    )

    it('should fail on empty pubDate', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, '     ')
        .catch(({ message }) => expect(message).to.equal('pubDate is empty or blank'))
    )

    it('should fail on no from', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate)
        .catch(({ message }) => expect(message).to.equal('from is not a string'))
    )

    it('should fail on empty from', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, '')
        .catch(({ message }) => expect(message).to.equal('from is empty or blank'))
    )

    it('should fail on empty from', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, '    ')
        .catch(({ message }) => expect(message).to.equal('from is empty or blank'))
    )

    it('should fail on no isDeleted', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, newsData.from)
        .catch(({ message }) => expect(message).to.equal('isDeleted is not a boolean'))
    )

    it('should fail on empty or blank isDeleted', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, newsData.from, '  ')
        .catch(({ message }) => expect(message).to.equal('isDeleted is not a boolean'))
    )

    it('should fail on no comments', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, newsData.from, false)
        .catch(({ message }) => expect(message).to.equal('comments is not an array'))
    )

    it('should fail on blank comments', () =>
      logic.updateNews(newsData.newsId, newsData.title, newsData.picture, newsData.summary, newsData.content, newsData.category, newsData.link, newsData.pubDate, newsData.from, false, '   ')
        .catch(({ message }) => expect(message).to.equal('comments is not an array'))
    )
  }) // DONE -> its OK 

  !false && describe('delete news', () => {

    it('should succeed on correct data', () =>
      News.create(newsData)
        .then(({ newsId }) => {
          return logic.deleteNews(newsId)
        })
        .then(item => {
          expect(item).to.be.true
        })
    )

    it('should fail on no newsId', () =>
      logic.existItem()
        .catch(({ message }) => expect(message).to.equal('newsId is not a string'))
    )

    it('should fail on empty newsId', () =>
      logic.existItem('')
        .catch(({ message }) => expect(message).to.equal('newsId is empty or blank'))
    )

    it('should fail on blank newsId', () =>
      logic.existItem('     ')
        .catch(({ message }) => expect(message).to.equal('newsId is empty or blank'))
    )

    it('should fail on wrong newsId', () =>
      logic.existItem('20181111121212')
        .then(item => expect(item).to.be.false)
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
      const note = new Comment({ text: noteText })

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
      const note = new Comment({ text: noteText })

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
      const note = new Comment({ text: noteText })

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

      const notes = indexes.map(index => new Comment({ text: `${noteText} ${index}` }))

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
      const note = new Comment({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ notes: [{ id: noteId }] }) => {
          return logic.updateNote(dummyUserId, noteId, `${noteText} 2`)
            .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyUserId}`))
        })
    })

    it('should fail on wrong note id', () => {
      const user = new User(userData)
      const note = new Comment({ text: noteText })

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
      const note = new Comment({ text: noteText })

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
      const note = new Comment({ text: noteText })

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
      const note = new Comment({ text: noteText })

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

      user.notes.push(new Comment({ text: `${noteText} a` }))
      user.notes.push(new Comment({ text: `${noteText} ab` }))
      user.notes.push(new Comment({ text: `${noteText} abc` }))
      user.notes.push(new Comment({ text: `${noteText} bc` }))
      user.notes.push(new Comment({ text: `${noteText} c` }))

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
