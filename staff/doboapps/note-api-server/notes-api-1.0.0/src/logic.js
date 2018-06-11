'use strict'

class Note {
    constructor(text) {
        this.id = Date.now()
        this.text = text
    }
}

const logic = {
    _notes: [],

    addNote(text) {
        const note = new Note(text)

        this._notes.push(note)
    },

    listNotes() {
        return this._notes
    },

    removeNote(id) {
        this._notes = this._notes.filter(n => n.id!= id)
    }
}

module.exports = logic