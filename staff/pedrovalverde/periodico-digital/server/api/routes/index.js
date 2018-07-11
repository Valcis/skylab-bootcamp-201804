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

// FOR EXTERN NEWS API :

router.get('/extnews/:category', (req, res) => {
    const { params: { category } } = req
    logic.getExternNewsBy(category).then(news => {
        res.json(news);
    })
})

// NEWS BBDD API ROUTES

router.post('/news-add', jsonBodyParser, (req, res) => { // CREATE
    const { body: { title, picture, summary, content, category, link, pubDate, from, comments } } = req

    logic.addNews(title, picture, summary, content, category, link, pubDate, from, comments)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.post('/news-bbdd', jsonBodyParser, (req, res) => { // check if exist
    const { body: { newsId } } = req

    logic.existItem(newsId)
        .then(item => {
            res.status(200)
            res.json({ status: 'OK', exist: item })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/news/:newsId', (req, res) => { // RETRIEVE news data
    const { params: { newsId } } = req

    return logic.retrieveNews(newsId)
        .then(news => {
            res.status(200)
            res.json({ status: 'OK', data: news })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })

})

router.patch('/news/:newsId', jsonBodyParser, (req, res) => {  // UPDATE 
    const { params: { newsId }, body: { title, picture, summary, content, category, link, pubDate, from, comments } } = req

    logic.updateUser(newsId, title, picture, summary, content, category, link, pubDate, from, comments)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.delete('/news/:newsId',  jsonBodyParser, (req, res) => {
    const { params: { newsId }, body: { email, password } } = req

    logic.deleteNews(newsId, email, password)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


// COMMENTS BBDD API ROUTES


//TODO -> addComment
//TODO -> retrieveComment
//TODO -> listCommentsByUser backoffice
//TODO -> listCommentsByNews backoffice
//TODO -> removeComment
//TODO -> updateComment
//TODO -> findComment backoffice



router.post('/:newsId/comments', [jwtValidator, jsonBodyParser], (req, res) => {
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

router.get('/:newsId/comments/:id', jwtValidator, (req, res) => {
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

router.get('/:newsId/comments', jwtValidator, (req, res) => {
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

router.delete('/:newsId/comments/:id', jwtValidator, (req, res) => {
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

router.patch('/:newsId/comments/:id', [jwtValidator, jsonBodyParser], (req, res) => {
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

module.exports = router