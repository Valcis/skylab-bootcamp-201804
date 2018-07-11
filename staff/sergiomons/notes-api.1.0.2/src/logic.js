const uuidv1 = require('uuid/v1');
class Note {
    constructor(text) {
        this.id = uuidv1();
        this.text = text
    }
}

const logic = {
    _notes: [],

    addNote(text) {

        if (typeof text !== 'string') throw Error('Invalid input text, it must a string')
        if (text === '') throw Error('Text cannot blank or empty')
        const note = new Note(text)

        this._notes.push(note)

        return note.id
    },

    listNotes() {
        return this._notes
    },

    removeNote(id) {

        if (typeof id !== 'string') throw Error('Invalid id, it must a string')

        const note = this._notes.find(note => note.id == id)

        if(note) {
            this._notes = this._notes.filter(note => note.id != id)

            return note.id
        }
      return false
    }

}

module.exports = logic