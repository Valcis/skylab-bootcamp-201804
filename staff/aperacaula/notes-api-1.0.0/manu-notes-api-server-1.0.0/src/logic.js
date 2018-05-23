'use strict'

class Note {
    constructor(text) {
        this.id = `${Date.now()}-${Math.random()}`
        this.text = text
    }
}

const logic = {
    _notes: [],

    /**
     * 
     * @param {*} text 
     * 
     * @throws
     */
    addNote(text) {
        if (typeof text !== 'string') throw Error('text is not a string')

        if ((text = text.trim()).length === 0) throw Error('text is empty or blank')

        const note = new Note(text)

        this._notes.push(note)

        return note.id
    },

    /**
     * 
     * @param {*} id 
     * 
     * @throws
     */
    retrieveNote(id) {
        if (typeof id !== 'string') throw Error('id is not a string')

        if (!(id = id.trim())) throw Error('id is empty or blank')

        const index = this._notes.findIndex(note => note.id === id)

        if (index < 0) throw Error(`note with id ${id} does not exist`)

        return this._notes[index]
    },

    /**
     * 
     */
    listNotes() {
        return this._notes
    },

    removeNote(id) {
        if (typeof id !== 'string') throw Error('id is not a string')

        if (!(id = id.trim())) throw Error('id is empty or blank')

        const index = this._notes.findIndex(note => note.id === id)

        if (index < 0) throw Error(`note with id ${id} does not exist`)

        this._notes.splice(index, 1)
    },

    updateNote(id, text) {
        if (typeof id !== 'string') throw Error('id is not a string')

        if (!(id = id.trim())) throw Error('id is empty or blank')

        if (typeof text !== 'string') throw Error('text is not a string')

        if ((text = text.trim()).length === 0) throw Error('text is empty or blank')

        const note = this._notes.find(note => note.id === id)

        if (!note) throw Error(`note with id ${id} does not exist`)

        note.text = text
    },

    findNotes(text){

        let filter=[]

        this._notes.forEach(note=>{
            if (note.text.indexOf(text)>-1){
                filter.push(note)
            }
        })

        return filter

    }
}

module.exports = logic