'use strict'

const logic = require('../../logic')

module.exports = (req, res) => {
    // const text = req.body.text
    const { text } = req.body 
    // const { body: {text}} = req
    try {
        logic.createnote(text)
        .then(note => {
            res.json({status: "OK", data: note._id})
        })
    }catch({message}) {
    
            res.json({status: 'KO', error: message})
        }
}