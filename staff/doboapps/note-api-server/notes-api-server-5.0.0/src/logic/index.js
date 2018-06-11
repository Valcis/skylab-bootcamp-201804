'use strict'

// index 5.0

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

        return User.findOne({email})
            .then((user) => {

                if (user === null) {
                    return User.create({ name, surname, email, password })
        
                } else {
                    throw Error('this email exists on the db')
                }
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
     * @returns {Promise<Object>} 
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
     * @throws
     */
    addNote(userId, text) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

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
     * @param {string} id 
     * 
     * @throws
     */
    retrieveNote(userId, id) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

                if (typeof id !== 'string') throw Error('id is not a string')

                if (!(id = id.trim())) throw Error('id is empty or blank')

                return User.findById(userId)
                    .then(({ notes }) => {
                        const note = notes.find(v => v._id.toString() == id)
                        if (!note) throw Error(`note with id ${id} does not exist for userId ${userId}`)

                        return Promise.resolve()
                            .then(() => ({
                                noteId: note.id,
                                userId,
                                text: note.text
                            }))
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
                if (!userId) throw Error('you must input a userId')

                if (typeof userId !== 'string') throw Error('userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

                return User.findById(userId)
                    .then(user => {
                        if (user == null) throw Error('userId not found')
                        return Promise.resolve()
                            .then(() => user.notes)
                    })
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
                if (typeof userId !== 'string') throw Error('userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

                if (typeof id !== 'string') throw Error('id is not a string')

                if (!(id = id.trim())) throw Error('id is empty or blank')

                return User.findById(userId)
                    .then((user) => {
                        if (!user) throw Error(`no user found with id ${userId}`)

                        let { notes } = user;
                        // notes.forEach((note, index, notes) => {
                        //     if (note.id === id) && notes.splice(index, 1)     
                        // })

                        for (let i = 0; i < notes.length; i++) {
                            if (notes[i].id === id) {
                                notes.splice(i, 1)
                                break
                            }
                        }
                        return user.save()
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
                if (typeof userId !== 'string') throw Error('userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

                if (typeof id !== 'string') throw Error('id is not a string')

                if (!(id = id.trim())) throw Error('id is empty or blank')

                if (typeof text !== 'string') throw Error('text is not a string')

                if ((text = text.trim()).length === 0) throw Error('text is empty or blank')

                return User.findById(userId)
                    .then(user => {
                        if (!user) throw Error(`no user found with id ${userId}`)

                        user.notes.forEach((note, index) => {
                            (note.id === id) && (note.text = text)
                        });

                        return user.save()
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

        let filteredNotes;

        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

                if (typeof text !== 'string') throw Error('text is not a string')

                if (!text.length) throw Error('text is empty')


                return User.findById(userId)
                    .then(user => {
                        if (!user) throw Error(`no user found with id ${userId}`)

                        filteredNotes = user.notes.filter((note) => {
                            return note.text.includes(text)
                        });

                        return user.save()
                            .then(() => {
                                return filteredNotes;
                            })
                    })
            })
    }
}

module.exports = logic