'use strict'

const mongoose = require('mongoose')
const Note = require('../models/Note')
const User = require('../models/User')

module.exports = {

    // listnotes() {
    //     return Note.find({})
    // },

    // createnote(text) {
    //     if (typeof text !== 'string') throw Error('text is not a string')

    //             if ((text = text.trim()).length === 0) throw Error('text is empty or blank')
    //     return Note.create({text})
    // },

    // retrieveNote(id) {
    //     return Note.findOne({_id: `${id}`})
    // },

    // update(id, text) {
    //     return Note.findOneAndUpdate({_id: `${id}`}, {$set: {text}})
    // },

    // delete(id) {
    //     return Note.findOneAndRemove({_id: `${id}`})
    // },

    login(email, password) {
        return User.findOne({email, password})
    },

    register(name, surname, email, password) {
        return User.create({name, surname, email, password})
    },

    addnote(id, note) {
        return User.findByIdAndUpdate({_id: id}, {$push: {notes:{text:note}}})
    },

    listUser(id,) {

    }
}