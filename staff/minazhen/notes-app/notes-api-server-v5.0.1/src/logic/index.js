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
                this._validateErrors(false, "", true, name, true, surname, true, email, true, password)

                return User.findOne({ email })
            })
                .then((user) => {
                if (user) throw Error(`User with email ${email} already exists`)
                
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
                this._validateErrors(false, "", false, "", false, "", true, email, true, password)

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
                if ((typeof id !== 'string') || (id.length !== 24)) throw Error("id has not a right format")

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
    updateUser(userId, name, surname, email, password, newEmail, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateErrors(true, userId, true, name, true, surname, true, email, true, password, true, newEmail, true, newPassword)

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== userId) throw Error(`no user found with id ${userId}`)

                if(newEmail){
                    return User.findOne({ email: newEmail })
                        .then(_user => {
                            if (_user && _user.id !== userId) {
                                throw Error(`user with email ${newEmail} already exists`)
                            } else return user
                        })
                }
                return user
            })
            .then((user => {
                user.name = name
                user.surname = surname
                if ((newEmail !== "")&&(typeof newEmail !== undefined)) user.email = newEmail ? newEmail : email;
                if ((newPassword !== "")&&(typeof newPassword !== undefined))user.password = newPassword ? newPassword : password;

                return user.save()
            }))
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
    unregisterUser(userId, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateErrors(true, userId, false, "", false, "", true, email, true, password)

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== userId) throw Error(`no user found with user id ${userId}`)

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
                this._validateNotes(true, userId, true, text)

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
    retrieveNote(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                this._validateNotes(true, userId, false, "", true, noteId)

                return User.findById(userId)
                    .then(user => {

                        if (!user) throw Error(`no user found with id ${userId}`)

                        const note = user.notes.id(noteId)
                        
                        if (!note) throw Error(`no note found with ${noteId} id, in user ${userId}`)

                        return { id : note.id, text: note.text }
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
                this._validateNotes(true, userId)

                return User.findById(userId)
                .then(user => {
                    if (!user) throw Error(`no user found with id ${userId}`)

                    const notes = user.notes.map(({ id, text }) => ({ id, userId : user.id, text }))

                    return notes
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
    removeNote(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                
                this._validateNotes(true, userId, false, "", true, noteId)

                return User.findByIdAndUpdate(userId, { $pull: { notes: { _id: noteId } } }, { new: true })
                    .then(user => {
                        if (!user) throw Error(`no note found with ${noteId} id, in user ${userId}`)

                        return true
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
    updateNote(userId, noteId, text) {
        return Promise.resolve()
            .then(() => {
                this._validateNotes(true, userId, true, text, true, noteId)

                return User.findById(userId)

                .then(user => {
                    if (!user) throw Error(`no user found with id ${userId}`)

                    let note = user.notes.id(noteId)

                    if (!note) throw Error(`no note found with ${noteId} id, in user ${userId}`)
                    
                    note.text = text
    
                    return user.save()
                })

            })
    },

    /**
     * 
     * @param {*} userId 
     * @param {*} text 
     */
    findNotes(userId, text) {
        return Promise.resolve()
        .then(() => {
                
            this._validateNotes(true, userId, true, text)


            return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`no user found with id ${userId}`)

                const txt = new RegExp(text,"i"); 
                
                const notes = [] 

                user.notes.forEach(note => {
                    if (note.text.search(txt) > -1) {
                        notes.push({ id: note.id, text: note.text }) 
                    }
                })
                
                return notes
            })
        })

    },

    _validateNotes(vUserId, userId, vText, text, vNoteId, noteId) {
        if (vText){
            if (typeof text !== "string") throw Error("Note text is not a string")

            if (!(text.trim()).length) throw Error("Note text is empty or blank")
        }
        if (vUserId){
            if (typeof userId !== 'string') throw Error('userId is not a string')

            if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

            if (userId.length !== 24) throw Error('userId has a wrong format')
        }
        if (vNoteId){
            if (typeof noteId !== 'string') throw Error('noteId is not a string')

            if (!(noteId = noteId.trim()).length) throw Error('noteId is empty or blank')

            if (noteId.length !== 24) throw Error('noteId has a wrong format')
        
        }
    },

    _validateErrors(vUserId, userId, vName, name, vSurname, surname, vEmail, email, vPassword, password, vnewEmail, newEmail, vnewPassword, newPassword) {
        if (vUserId){
            if (typeof userId !== 'string') throw Error('userId is not a string')

            if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

            if (userId.length !== 24) throw Error('userId has a wrong format')
        }
        if (vName){
            if (typeof name !== "string") throw Error("User name is not a string")
    
            if (!(name = name.trim()).length) throw Error("User name is empty or blank")
        }
        if (vSurname){
            if (typeof surname !== "string") throw Error("User surname is not a string")
    
            if (!(surname = surname.trim()).length) throw Error("User surname is empty or blank")
        }
        if (vEmail){
            if (typeof email !== "string") throw Error("User email is not a string")
    
            if (!(email = email.trim()).length) throw Error("User email is empty or blank")
    
            const rex  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
            if (!rex.test(email)) throw Error ("User email is not a valid email")
        }
        if (vPassword){
            if (typeof password !== "string") throw Error("User password is not a string")
    
            if (!(password.trim()).length) throw Error("User password is empty or blank")
        }
        if (vnewEmail){
            if ((newEmail === "") || (newEmail === undefined)) return;
            
            if (typeof newEmail !== "string") throw Error("User new email is not a string")
    
            if (!(newEmail = newEmail.trim()).length) throw Error("User new email is empty or blank")
    
            const rex  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
            if (!rex.test(newEmail)) throw Error ("User new email is not a valid email")
            
        }
        if (vnewPassword){
            if ((newPassword === "") || (newPassword === undefined)) return;
            
            if (typeof newPassword !== "string") throw Error("User new password is not a string")
    
            if (!(newPassword.trim()).length) throw Error("User new password is empty or blank")
            
        }
    }
}

module.exports = logic