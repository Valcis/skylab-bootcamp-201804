const logic = require('./logic')
const expect = require('expect')
const expectJS = require('expect.js')

describe('testing notes-api', () => {
    beforeEach(() => {
        logic._notes.length = 0;
    })
    
    it('test add notes', () => {
        logic.addNote('my note');

        const [note] = logic._notes; 
        expect(logic._notes.length).toBe(1);
        expect(note.text).toBe('my note');
        expect(note.id).toBeDefined();   
    })

    it('test show notes', () => {
        logic.addNote('my note');

        logic.addNote('my note2');
        const note = logic._notes;
        const arrayNotes= logic.listNotes();
        expect(note.length).toBe(2);
        expectJS(arrayNotes).to.be.an('array');;
        expect(note[0].text).toBe('my note');
        expect(note[1].text).toBe('my note2');
        expect(note[0].id).toBeDefined();
        expect(note[1].id).toBeDefined();
        expect(note[0].id).not.toBe(note[1].id)
        
    })

    it('test delete notes', () => {
        expect(logic._notes.length).toBe(0)
        logic.addNote('my note');
        logic.addNote('my note2');
        const id = logic._notes[0].id
        logic.removeNote(id)
        const note = logic._notes 
        
        expect(note.length).toBe(1)
        expect(note[0].text).toBe('my note2')

    })
})

describe('handler error addNotes', () => {

    it('addNote(7) should throw Error ', () => {

        expect(() => {
            logic.addNote(7)
        }).toThrow(Error('Invalid input text, it must a string'))
    })

    it('addNote(7) should throw Error ', () => {

        expect(() => {
            logic.addNote('')
        }).toThrow(Error('Text cannot blank or empty'))
    })

    it('removeNote(7) should throw Error ', () => {

        expect(() => {
            logic.removeNote(7)
        }).toThrow(Error('Invalid id, it must a string'))
    })
})


















// const expect = require('expect')
// const logic = require('./logic')

// describe('notes (logic)', () => {
//     beforeEach(() => {
//         logic._notes.length = 0
//         logic.addNote('my note')
//     })

//     it('should add note', () => {

//         expect(logic._notes.length).toBe(1)

//         const [note] = logic._notes

//         expect(note.text).toBe('my note')
//         expect(note.id).toBeDefined()
//     })

//     it('should list notes', () => {

//         logic.listNotes()

        


//         // ?
//     })

//     it('should remove a note', () => {
//         // logic.removeNote(id)

//         // ?
//     })
// })

