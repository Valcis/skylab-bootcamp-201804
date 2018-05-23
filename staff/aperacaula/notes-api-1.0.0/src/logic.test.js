const expect = require('expect')
const logic = require('./logic')

describe('notes (logic)', () => {
    beforeEach(() => logic._notes.length = 0)

    it('should add note', () => {
        logic.addNote('my note')

        expect(logic._notes.length).toBe(1)

        let [note] = logic._notes

        expect(note.text).toBe('my note')
        expect(note.id).toBeDefined()
    })

    it('should list notes', () => {
        logic.addNote('my note')
        let noteList= logic.listNotes()
        expect(noteList.length).toBe(1)
        expect(noteList[0].text).toBe('my note')
        expect(noteList[0].id).toBeDefined()

        
    })

    it('should remove a note', () => {
        logic.addNote('my note')
        
        let [note] = logic._notes

        expect(note.text).toBe('my note')
        expect(note.id).toBeDefined()

        logic.removeNote(note.id)
        expect(logic._notes.length).toBe(0)

        
        expect(()=> logic.removeNote(note.id)).toThrowError('Lilam sucks!!!')

    })
})

