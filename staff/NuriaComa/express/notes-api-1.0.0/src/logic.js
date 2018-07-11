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

    listNotes(){
        return this._notes
    },

    removeNote(id){
        let note = this._notes.find(note=>note.id == id)

        if (!note) throw Error ('id not found')

        this._notes=this._notes.filter(note=>note.id != id)
        
    }
}

module.exports = logic
