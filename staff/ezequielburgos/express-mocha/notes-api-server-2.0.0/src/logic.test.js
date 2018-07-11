'use strict'

const expect = require('expect')
const logic = require('./logic')

describe('logic (notes)', () => {
    const { _notes } = logic
    const userId = '123'

    beforeEach(() => _notes.length = 0)

    describe('add note', () => {
        it('should add on correct data', () => {
            expect(_notes.length).toBe(0)

            const id = logic.addNote(userId, 'my note')

            expect(id).toBeDefined()
            expect(_notes.length).toBe(1)
            expect(userId).toBeDefined()
            expect(userId).toBe('123')

            const [note] = _notes

            expect(note.id).toBeDefined()
            expect(note.id).toBe(id)
            expect(note.userId).toBe('123')
            expect(note.text).toBe('my note')
        })

        it('should add notes with different ids', () => {
            expect(_notes.length).toBe(0)

            logic.addNote(userId, 'my note 1')
            logic.addNote(userId, 'my note 2')
            logic.addNote(userId, 'my note 3')

            expect(_notes.length).toBe(3)
            expect(userId).toBeDefined()
            expect(userId).toBe('123')

            const [note1, note2, note3] = _notes

            expect(note1.id).not.toBe(note2.id)
            expect(note2.id).not.toBe(note3.id)
            expect(note3.id).not.toBe(note1.id)

            expect(note1.text).toBe('my note 1')
            expect(note2.text).toBe('my note 2')
            expect(note3.text).toBe('my note 3')

            expect(note1.userId).toBe('123')
            expect(note2.userId).toBe('123')
            expect(note3.userId).toBe('123')
        })

        it('should throw error on no userId', () => {
            expect(() => logic.addNote(123)).toThrowError('userId is not a string')
        })

        it('should throw error on no userId', () => {
            expect(() => logic.addNote()).toThrowError('userId is not a string')
        })

        it('should throw error on no userId', () => {
            expect(() => logic.addNote(undefined, '')).toThrowError('userId is not a string')
        })

        it('should throw error on empty userId', () => {
            expect(() => logic.addNote('', '')).toThrowError('userId is empty or blank')
        })

        it('should throw error on no text', () => {
            expect(() => logic.addNote(userId)).toThrowError('text is not a string')
        })

        it('should throw error on empty text', () => {
            expect(() => logic.addNote(userId, '')).toThrowError('text is empty or blank')
        })

        it('should throw error on blank text', () => {
            expect(() => logic.addNote(userId, '   ')).toThrowError('text is empty or blank')
        })
    })

    it('should list notes', () => {
        expect(_notes.length).toBe(0)

        logic.addNote(userId, 'my note 1')
        logic.addNote(userId, 'my note 2')
        logic.addNote(userId, 'my note 3')

        expect(_notes.length).toBe(3)
        expect(userId).toBeDefined()
        expect(userId).toBe('123')

        const notes = logic.listNotes(userId)

        expect(notes.length).toBe(_notes.length)
        expect(notes).toEqual(_notes)
        expect(notes.toString()).toBe(_notes.toString())
    })

    it('should throw error on no userId', () => {
        expect(() => logic.listNotes(123)).toThrowError('userId is not a string')
    })

    it('should throw error on no userId', () => {
        expect(() => logic.listNotes()).toThrowError('userId is not a string')
    })

    it('should throw error on no userId', () => {
        expect(() => logic.listNotes(undefined, '')).toThrowError('userId is not a string')
    })

    it('should throw error on empty userId', () => {
        expect(() => logic.listNotes('', '')).toThrowError('userId is empty or blank')
    })

    describe('retrieve note', () => {
        it('should succeed on correct data', () => {
            expect(_notes.length).toBe(0)

            const id = logic.addNote(userId, 'my note')

            expect(_notes.length).toBe(1)
            expect(userId).toBeDefined()
            expect(userId).toBe('123')

            const note = logic.retrieveNote(userId, id)

            expect(note).toBeDefined()
            expect(note.userId).toBe('123')
            expect(note.id).toBe(id)
            expect(note.text).toBe('my note')
        })


        it('should throw error on no userId', () => {
            expect(() => logic.retrieveNote(123)).toThrowError('userId is not a string')
        })

        it('should throw error on no userId', () => {
            expect(() => logic.retrieveNote()).toThrowError('userId is not a string')
        })
    
        it('should throw error on no userId', () => {
            expect(() => logic.retrieveNote(undefined, '')).toThrowError('userId is not a string')
        })

        it('should throw error on empty userId', () => {
            expect(() => logic.retrieveNote('', '')).toThrowError('userId is empty or blank')
        })

        it('should throw error on no id', () => {
            expect(() => logic.retrieveNote(userId)).toThrowError('id is not a string')
        })

        it('should throw error on empty id', () => {
            expect(() => logic.retrieveNote(userId, '')).toThrowError('id is empty or blank')
        })

        it('should throw error on blank id', () => {
            expect(() => logic.retrieveNote(userId, '             ')).toThrowError('id is empty or blank')
        })

        it('should throw error on wrong id', () => {
            const id = 'non-existing-note-id'

            expect(() => logic.retrieveNote(userId, id)).toThrowError(`note with id ${id} does not exist`)
        })
    })

    describe('remove note', () => {
        it('should remove a note', () => {
            expect(_notes.length).toBe(0)

            logic.addNote(userId, 'my note')

            expect(_notes.length).toBe(1)

            const [note] = _notes

            logic.removeNote(userId, note.id)

            expect(userId).toBeDefined()
            expect(userId).toBe('123')
            expect(note.userId).toBe('123')
            expect(_notes.length).toBe(0)
            expect(_notes).toBe(logic._notes)
        })

        it('should throw error on no userId', () => {
            expect(() => logic.removeNote(123)).toThrowError('userId is not a string')
        })

        it('should throw error on no userId', () => {
            expect(() => logic.removeNote()).toThrowError('userId is not a string')
        })
    
        it('should throw error on no userId', () => {
            expect(() => logic.removeNote(undefined, '')).toThrowError('userId is not a string')
        })

        it('should throw error on empty userId', () => {
            expect(() => logic.removeNote('', '')).toThrowError('userId is empty or blank')
        })

        it('should throw error on no id', () => {
            expect(() => logic.removeNote(userId)).toThrowError('id is not a string')
        })

        it('should throw error on empty id', () => {
            expect(() => logic.removeNote(userId, '')).toThrowError('id is empty or blank')
        })

        it('should throw error on blank id', () => {
            expect(() => logic.removeNote(userId, '             ')).toThrowError('id is empty or blank')
        })

        it('should throw error on wrong id', () => {
            const id = 'non-existing-note-id'

            expect(() => logic.removeNote(userId, id)).toThrowError(`note with id ${id} does not exist`)
        })
    })

    describe('update note', () => {
        it('should succeed on correct data', () => {
            expect(_notes.length).toBe(0)

            logic.addNote(userId, 'my note')

            expect(_notes.length).toBe(1)

            const [{ id }] = _notes

            logic.updateNote(userId, id, 'my new note')

            expect(_notes.length).toBe(1)

            const [note] = _notes

            expect(userId).toBeDefined()
            expect(userId).toBe('123')
            expect(note.userId).toBe('123')
            expect(note.id).toBe(id)
            expect(note.text).toBe('my new note')
        })

        it('should throw error on no userId', () => {
            expect(() => logic.updateNote(123)).toThrowError('userId is not a string')
        })

        it('should throw error on no userId', () => {
            expect(() => logic.updateNote()).toThrowError('userId is not a string')
        })
    
        it('should throw error on no userId', () => {
            expect(() => logic.updateNote(undefined, '')).toThrowError('userId is not a string')
        })

        it('should throw error on empty userId', () => {
            expect(() => logic.updateNote('', '')).toThrowError('userId is empty or blank')
        })

        it('should throw error on no id', () => {
            expect(() => logic.updateNote(userId)).toThrowError('id is not a string')
        })

        it('should throw error on empty id', () => {
            expect(() => logic.updateNote(userId, '')).toThrowError('id is empty or blank')
        })

        it('should throw error on blank id', () => {
            expect(() => logic.updateNote(userId, '             ')).toThrowError('id is empty or blank')
        })

        it('should throw error on wrong id', () => {
            const id = 'non-existing-note-id'

            expect(() => logic.updateNote(userId, id, 'text')).toThrowError(`note with id ${id} does not exist`)
        })

        it('should throw error on no text', () => {
            expect(() => logic.updateNote(userId, '123')).toThrowError('text is not a string')
        })

        it('should throw error on empty text', () => {
            expect(() => logic.updateNote(userId, '123', '')).toThrowError('text is empty or blank')
        })

        it('should throw error on blank text', () => {
            expect(() => logic.updateNote(userId, '123', '   ')).toThrowError('text is empty or blank')
        })
    })

    describe('search notes', () => {
        it('should return results on matching text', () => {
            expect(_notes.length).toBe(0)

            const id1 = logic.addNote(userId, 'my note 1')
            const id2 = logic.addNote(userId, 'my note 11')
            const id3 = logic.addNote(userId, 'my note 111')

            const res = logic.findNotes(userId, '11')

            expect(res).toBeDefined()
            expect(res.length).toBe(2)

            const [note1, note2] = res

            expect(userId).toBeDefined()
            expect(userId).toBe('123')

            expect(note1).toBeDefined()
            expect(note1.id).toBe(id2)
            expect(note1.text).toBe('my note 11')
            expect(note1.userId).toBe('123')

            expect(note2).toBeDefined()
            expect(note2.id).toBe(id3)
            expect(note2.text).toBe('my note 111')
            expect(note2.userId).toBe('123')
        })

        it('should return results on matching text case', () => {
            expect(_notes.length).toBe(0)

            const id1 = logic.addNote(userId, 'my note a')
            const id2 = logic.addNote(userId, 'my note aA')
            const id3 = logic.addNote(userId, 'my note aAa')

            const res = logic.findNotes(userId, 'aA')

            expect(res).toBeDefined()
            expect(res.length).toBe(2)

            const [note1, note2] = res

            expect(note1).toBeDefined()
            expect(note1.id).toBe(id2)
            expect(note1.text).toBe('my note aA')
            expect(note1.userId).toBe('123')

            expect(note2).toBeDefined()
            expect(note2.id).toBe(id3)
            expect(note2.text).toBe('my note aAa')
            expect(note2.userId).toBe('123')
        })

        it('should throw error on no userId', () => {
            expect(() => logic.findNotes(123)).toThrowError('userId is not a string')
        })

        it('should throw error on no userId', () => {
            expect(() => logic.findNotes()).toThrowError('userId is not a string')
        })
    
        it('should throw error on no userId', () => {
            expect(() => logic.findNotes(undefined, '')).toThrowError('userId is not a string')
        })

        it('should throw error on empty userId', () => {
            expect(() => logic.findNotes('', '')).toThrowError('userId is empty or blank')
        })

        it('should throw error on no text', () => {
            expect(() => logic.findNotes(userId)).toThrowError('text is not a string')
        })

        it('should throw error on empty text', () => {
            expect(() => logic.findNotes(userId, '')).toThrowError('text is empty')
        })
    })
})

