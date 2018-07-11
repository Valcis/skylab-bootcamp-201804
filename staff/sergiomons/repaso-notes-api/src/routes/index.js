const express = require('express')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const logic = require('../logic')
const { listnotes, addnotes } = require('./handlers')

const router = express.Router()

// router.get('/listnotes', listnotes)

// router.post('/add-note', bodyParserJSON, addnotes)

// router.get('/retrieve/:id', (req, res) => {
//     const { params: {id} } = req

//    return logic.retrieveNote(id)
//         .then(note => {
//             res.json({status: "OK", note})
//         }).catch(err => {
//             res.json(err.message)
//         })
// })
  
// router.put('/update/:id', bodyParserJSON, (req, res) => {
//     const { params: {id}, body: {text}} = req
    
//     logic.update(id, text)
//         .then(note => {
//             res.json({status: "OK"})
//         }).catch(err => {
//             res.json(err.message)
//         })
// })

// router.delete('/delete/:id', (req, res) => {
//     const { params: {id} } = req
    
//     logic.delete(id)
//         .then(note => {
//             res.json({status: "OK"})
//         }).catch(err => {
//             res.json(err.message)
//         })
//     })

   router.post('/register', (req, res) => {
        const { body: {name, surname, email, password} } = req
        return logic.register(name, surname, email, password)
            .then(user => {
                res.json({status:"OK", data: user._id})
            }).catch(err => {
                res.json({status: 'KO', message: err.message})
            })
    })

    router.post('/login', (req, res) => {
        const { body: {email, password} } = req
        return logic.login(email, password)
            .then(user => {
                res.json({status:"OK", data: user._id})
            }).catch(err => {
                res.json({status: 'KO', message: err.message})
            })
    })

    router.put('/addnote', (req, res) => {
        const { params: {id}, body: {text} } = req
        return logic.addnote(id, text)
            .then(user => {
                res.json({status:"OK", data: user.notes})
            }).catch(err => {
                res.json({status: 'KO', message: err.message})
            })
        
    })

module.exports = router