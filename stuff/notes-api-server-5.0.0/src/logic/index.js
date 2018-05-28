'use strict'

const { User, Note } = require('../models')

const logic = {
    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, surname, email, password) {
        return Promise.resolve()
            .then(() => {
                // TODO validations (name, surname, email, password)

                return User.create({ name, surname, email, password })
                    .then(() => true)
            })
    },

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                // TODO validations

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                return user.id
            })
    },

    /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('id is not a string')

                // TODO validations

                return User.findById(id).select({ _id: 0, id: 1, name: 1, surname: 1, email: 1 })
            })
            .then(user => {
                if (!user) throw Error(`no user found with id ${id}`)

                return user
            })
    },

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @returns {Promise<boolean>}
     */
    updateUser(id, name, surname, email, password, newEmail, newPassword) {
        return Promise.resolve()
            .then(() => {
                // TODO validations

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                user.name = name
                user.surname = surname
                user.email = newEmail ? newEmail : email
                user.password = newPassword ? newPassword : password

                return user.save()
            })
            .then(() => true)
    },

    /**
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser(id, email, password) {
        return Promise.resolve()
            .then(() => {
                // TODO validations

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                return user.remove()
            })
            .then(() => true)
    },

    /**
     * 
     * @param {string} userId
     * @param {string} text 
     * 
     * @retuns {Promise<string>}
     */
    addNote(userId, text) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof text !== 'string') throw Error('text is not a string')

                if ((text = text.trim()).length === 0) throw Error('text is empty or blank')

                // way 1 (step by step)
                // return User.findById(userId)
                //     .then(user => {
                //         if (!user) throw Error(`no user found with id ${userId}`)

                //         const note = new Note({ text })

                //         user.notes.push(note)

                //         return user.save()
                //             .then(() => note.id)
                //     })

                // way 2 (1 step)
                return User.findByIdAndUpdate(userId, { $push: { notes: { text } } }, { new: true })
                    .then(user => {
                        if (!user) throw Error(`no user found with id ${userId}`)

                        return user.notes[user.notes.length - 1].id
                    })
            })
    },

    /**
     * 
     * @param {string} userId
     * @param {string} noteId 
     * 
     * @returns {Promise<Note>}
     */
    retrieveNote(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof noteId !== 'string') throw Error('note id is not a string')

                if (!(noteId = noteId.trim())) throw Error('note id is empty or blank')

                return User.findById(userId)
                    .then(user => {
                        if (!user) throw Error(`no user found with id ${userId}`)

                        return user.notes.id(noteId)
                    })
                    .then(note => {
                        if (!note) throw Error(`no note found with id ${noteId}`)

                        return note
                    })
            })
    },

    /**
     * @param {string} userId
     * 
     * @throws
     */
    listNotes(userId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                return this._notes.find({ userId }).toArray()
                    .then(notes => notes.map(({ _id, userId, text }) => ({ id: _id.toString(), userId, text })))
            })
    },

    /**
     * 
     * @param {string} userId
     * @param {string} id 
     *
     * @throws
     */
    removeNote(userId, id) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof id !== 'string') throw Error('id is not a string')

                if (!(id = id.trim())) throw Error('id is empty or blank')

                return this._notes.findOneAndDelete({ _id: ObjectId(id), userId })
                    .then(res => {
                        if (!res.value) throw Error(`note with id ${id} does not exist for userId ${userId}`)
                    })
            })
    },

    /**
     * 
     * @param {string} userId
     * @param {string} id 
     * @param {string} text 
     * 
     * @throws
     */
    updateNote(userId, id, text) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof id !== 'string') throw Error('id is not a string')

                if (!(id = id.trim())) throw Error('id is empty or blank')

                if (typeof text !== 'string') throw Error('text is not a string')

                if ((text = text.trim()).length === 0) throw Error('text is empty or blank')

                return this._notes.findOneAndUpdate({ _id: ObjectId(id), userId }, { $set: { text } })
                    .then(res => {
                        if (!res.value) throw Error(`note with id ${id} does not exist for userId ${userId}`)
                    })
            })
    },

    /**
     * 
     * @param {string} userId
     * @param {string} text 
     * 
     * @throws
     */
    findNotes(userId, text) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof text !== 'string') throw Error('text is not a string')

                if (!text.length) throw Error('text is empty')

                return this._notes.find({ userId, text: { $regex: text } }).toArray()
                    .then(notes => notes.map(({ _id, userId, text }) => ({ id: _id.toString(), userId, text })))
            })
    }
}

module.exports = logic