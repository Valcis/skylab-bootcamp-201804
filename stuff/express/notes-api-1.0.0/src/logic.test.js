const expect = require('expect')
const logic = require('./logic')

describe('notes (logic)', () => {
    beforeEach(() => logic._notes.length = 0)

    it('should add note', () => {
        logic.addNote('my note')

        expect(logic._notes.length).toBe(1)

        const [note] = logic._notes

        expect(note.text).toBe('my note')
        expect(note.id).toBeDefined()
    })

    it('should list notes', () => {
        // logic.listNotes()

        // ?
    })

    it('should remove a note', () => {
        // logic.removeNote(id)

        // ?
    })
})

