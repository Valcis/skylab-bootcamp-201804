class Note {
    constructor(text) {
        this.id = `${Date.now()}-${Math.random()}`
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
        // if (typeof id !== 'number') throw Error('id is not a number');

        var noteIndex;
        var note = this._notes.find(function (note, index) {
                return this._notes
        });

        this._notes.splice(noteIndex, 1);
    }
}

module.exports = logic