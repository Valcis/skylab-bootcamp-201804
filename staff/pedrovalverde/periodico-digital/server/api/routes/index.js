'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const logic = require('logic')
const jwt = require('jsonwebtoken')
const jwtValidation = require('./utils/jwt-validation')

const router = express.Router()
const { env: { TOKEN_SECRET, TOKEN_EXP } } = process
const jwtValidator = jwtValidation(TOKEN_SECRET)
const jsonBodyParser = bodyParser.json()

// USERS API ROUTES

router.post('/users', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, password, birthdate, gender, address, permission } } = req

    logic.registerUser(name, surname, email, username, password, birthdate, gender, address, permission)
        .then(() => {
            res.status(201)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateUser(email, password)
        .then(id => {
            const token = jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

            res.status(200)
            res.json({ status: 'OK', data: { id, token } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/users/:userId', jwtValidator, (req, res) => {
    const { params: { userId } } = req

    return logic.retrieveUser(userId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })

})

router.patch('/users/:userId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { name, surname, email, username, password, birthdate, gender, address, permission, newEmail, newPassword } } = req

    logic.updateUser(userId, name, surname, email, username, password, birthdate, gender, address, permission, newEmail, newPassword)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.delete('/users/:userId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { email, password } } = req

    logic.unregisterUser(userId, email, password)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

// COMMENTS API ROUTES

    //TODO -> addComment
    //TODO -> retrieveComment
    //TODO -> listCommentsByUser backoffice
    //TODO -> listCommentsByNews backoffice
    //TODO -> removeComment
    //TODO -> updateComment
    //TODO -> findComment backoffice



router.post('/news/:userId/comments', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { text } } = req

    logic.addNote(userId, text)
        .then(id => {
            res.status(201)
            res.json({ status: 'OK', data: { id } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/news/:userId/comments/:id', jwtValidator, (req, res) => {
    const { params: { userId, id } } = req

    logic.retrieveNote(userId, id)
        .then(note => {
            res.json({ status: 'OK', data: note })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/news/:userId/comments', jwtValidator, (req, res) => {
    const { params: { userId }, query: { q } } = req;

    (q ? logic.findNotes(userId, q) : logic.listNotes(userId))
        .then(notes => {
            res.json({ status: 'OK', data: notes })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })

})

router.delete('/news/:userId/comments/:id', jwtValidator, (req, res) => {
    const { params: { userId, id } } = req

    logic.removeNote(userId, id)
        .then(() => {
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.patch('/news/:userId/comments/:id', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId, id }, body: { text } } = req

    logic.updateNote(userId, id, text)
        .then(() => {
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

// NEWS API ROUTES

router.post('/news', jsonBodyParser, (req, res) => {
    const { body: { title, subtitle, summary, complete, category, from, comments } } = req

    logic.addNews(title, subtitle, summary, complete, category, from, comments)
        .then(id => {
            res.status(201)
            res.json({ status: 'OK', data: {id} })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


('retrieve news', () => {

  it('should succeed on correct data', () =>
    news.create(userData)
      .then(({ id }) => {
        return logic.retrieveUser(id)
      })
      .then(user => {
        expect(user).to.exist

        const { name, surname, email, newsname, password, birthdate, gender, address, permission } = news

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

  it('should fail on no news id', () =>
    logic.retrieveUser()
      .catch(({ message }) => expect(message).to.equal('user id is not a string'))
  )

  it('should fail on empty news id', () =>
    logic.retrieveUser('')
      .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
  )

  it('should fail on blank news id', () =>
    logic.retrieveUser('     ')
      .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
  )
})

router.post('/news/auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateUser(email, password)
        .then(id => {
            const token = jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

            res.status(200)
            res.json({ status: 'OK', data: { id, token } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/news/:userId', (req, res) => {
    const { params: { userId } } = req

    return logic.retrieveUser(userId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })

})


    //TODO -> Update
    //TODO -> Delete






module.exports = router