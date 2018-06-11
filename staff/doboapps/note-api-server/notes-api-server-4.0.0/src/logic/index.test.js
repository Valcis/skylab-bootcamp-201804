'use strict'

const { MongoClient, ObjectId } = require('mongodb')
const expect = require('expect')
const logic = require('.')

describe('logic (notes)', () => {
    let cn, db, cl
    const userId = '123'

    before(done => {
        MongoClient.connect('mongodb://localhost:27017/skylab-bootcamp-201804-test', { useNewUrlParser: true }, (err, conn) => {
            if (err) throw err

            cn = conn
            db = cn.db()
            cl = db.collection('notes')

            logic.init(db)

            done()
        })
    })

    // beforeEach(done => {
    //     cl.deleteMany()
    //         .then(() => done())
    // })

    beforeEach(() => cl.deleteMany())

    after(done => db.dropDatabase(() => cn.close(done)))

    describe('add note', () => {
        it('should add on correct data', () =>
            logic.addNote(userId, 'my note')
                .then(id => {
                    expect(id).toBeDefined()

                    return cl.findOne({ _id: ObjectId(id) })
                        .then(note => {
                            expect(note._id).toBeDefined()
                            expect(note._id.toString()).toBe(id)
                            expect(note.userId).toBe(userId)
                            expect(note.text).toBe('my note')
                        })
                })
        )

        it('should add notes with different ids', (done) => {

            const p1 = logic.addNote(userId, 'my note 1')
            const p2 = logic.addNote(userId, 'my note 2')
            const p3 = logic.addNote(userId, 'my note 3')

            Promise.all([p1, p2, p3]).then(res => {
                expect(res.length).toBe(3)

                expect(res[0]).not.toBe(res[1])
                expect(res[1]).not.toBe(res[2])
                expect(res[2]).not.toBe(res[0])

                Promise.all([p1, p2, p3])
                    .then(res => {

                        cl.findOne({ _id: ObjectId(res[0]) }).then(data => {
                            expect(data.text).toBe(`my note 1`)
                        })
                        cl.findOne({ _id: ObjectId(res[1]) }).then(data => {
                            expect(data.text).toBe(`my note 2`)
                        })
                        cl.findOne({ _id: ObjectId(res[2]) }).then(data => {
                            expect(data.text).toBe(`my note 3`)
                        })

                        done()

                    })
            })
        })

        it('should throw error on no userId', () =>
            logic.addNote()
                .catch(({ message }) => expect(message).toBe('userId is not a string'))
        )

        it('should throw error on empty userId', () =>
            logic.addNote('')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on blank userId', () =>
            logic.addNote('       ')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on no text', () =>
            logic.addNote("123")
                .catch(({ message }) => expect(message).toBe('text is not a string'))
        )

        it('should throw error on empty text', () =>
            logic.addNote("123", "")
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        )

        it('should throw error on blank text', () => {
            logic.addNote("123", '     ')
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        })
    })

    describe('list notes', () => {
        it('should succeed on correct data', (done) => {
            // // expect(_notes.length).toBe(0)

            const ids = []
            ids.push(logic.addNote(userId, 'my note 1'))
            ids.push(logic.addNote(userId, 'my note 2'))
            ids.push(logic.addNote(userId, 'my note 3'))


            Promise.all(ids).then(res => {
                expect(res.length).toBe(3)
            })

            const userId2 = '456'

            const ids2 = []
            ids2.push(logic.addNote(userId2, 'my note 4'))
            ids2.push(logic.addNote(userId2, 'my note 5'))
            ids2.push(logic.addNote(userId2, 'my note 6'))
            ids2.push(logic.addNote(userId2, 'my note 7'))

            Promise.all(ids2).then(res => {
                expect(res.length).toBe(4)
            })

            Promise.resolve(res => {

                logic.listNotes(userId)
            }).then(() => {
                done()

            })

            // const notes = logic.listNotes(userId)

            // expect(notes.length).toBe(3)

            // notes.forEach((note, index) => {
            //     expect(note.id).toBe(ids[index])
            //     expect(note.userId).toBe(userId)
            //     expect(note.text).toBe(`my note ${index + 1}`)
            // })

            // const notes2 = logic.listNotes(userId2)

            // expect(notes2.length).toBe(4)

            // notes2.forEach((note, index) => {
            //     expect(note.id).toBe(ids2[index])
            //     expect(note.userId).toBe(userId2)
            //     expect(note.text).toBe(`my note ${index + 4}`)
            // })
        })

        it('should throw error on non userId', () => {
            expect(() => logic.listNotes()).toThrowError('userId is not a string')
        })

        it('should throw error on empty userId', () => {
            expect(() => logic.listNotes('')).toThrowError('userId is empty or blank')
        })

        it('should throw error on blank userId', () => {
            expect(() => logic.listNotes('      ')).toThrowError('userId is empty or blank')
        })
    })

    false && describe('retrieve note', () => {
        it('should succeed on correct data', () => {
            expect(_notes.length).toBe(0)

            const id = logic.addNote(userId, 'my note')

            expect(_notes.length).toBe(1)

            const note = logic.retrieveNote(userId, id)

            expect(note).toBeDefined()
            expect(note.id).toBe(id)
            expect(note.userId).toBe(userId)
            expect(note.text).toBe('my note')

            expect(() => logic.retrieveNote('456', id)).toThrowError(`note with id ${id} does not exist`)
        })

        it('should throw error on non userId', () => {
            expect(() => logic.retrieveNote()).toThrowError('userId is not a string')
        })

        it('should throw error on empty userId', () => {
            expect(() => logic.retrieveNote('')).toThrowError('userId is empty or blank')
        })

        it('should throw error on blank userId', () => {
            expect(() => logic.retrieveNote('      ')).toThrowError('userId is empty or blank')
        })

        it('should throw error on wrong userId', () => {
            const id = logic.addNote(userId, 'my note')

            expect(() => logic.retrieveNote('wrong-id', id)).toThrowError(`note with id ${id} does not exist for userId wrong-id`)
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
            const id = logic.addNote(userId, 'my note')

            expect(() => logic.retrieveNote(userId, 'wrong-id')).toThrowError(`note with id wrong-id does not exist for userId ${userId}`)
        })
    })

    false && describe('remove note', () => {
        it('should remove a note', () => {
            expect(_notes.length).toBe(0)

            const id = logic.addNote(userId, 'my note')

            expect(_notes.length).toBe(1)

            expect(() => logic.removeNote('wrong-id', id)).toThrowError(`note with id ${id} does not exist for userId wrong-id`)

            logic.removeNote(userId, id)

            expect(_notes.length).toBe(0)
            expect(_notes).toBe(logic._notes)
        })

        it('should throw error on non userId', () => {
            expect(() => logic.removeNote()).toThrowError('userId is not a string')
        })

        it('should throw error on empty userId', () => {
            expect(() => logic.removeNote('')).toThrowError('userId is empty or blank')
        })

        it('should throw error on blank userId', () => {
            expect(() => logic.removeNote('      ')).toThrowError('userId is empty or blank')
        })

        it('should throw error on wrong userId', () => {
            const id = logic.addNote(userId, 'my note')

            expect(() => logic.removeNote('wrong-id', id)).toThrowError(`note with id ${id} does not exist for userId wrong-id`)
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
            const id = logic.addNote(userId, 'my note')

            expect(() => logic.removeNote(userId, 'wrong-id')).toThrowError(`note with id wrong-id does not exist for userId ${userId}`)
        })
    })

    false && describe('update note', () => {
        it('should succeed on correct data', () => {
            expect(_notes.length).toBe(0)

            const id = logic.addNote(userId, 'my note')

            expect(_notes.length).toBe(1)

            expect(() => logic.updateNote('wrong-id', id, 'my new note')).toThrowError(`note with id ${id} does not exist for userId wrong-id`)

            logic.updateNote(userId, id, 'my new note')

            expect(_notes.length).toBe(1)

            const [note] = _notes

            expect(note.userId).toBe(userId)
            expect(note.id).toBe(id)
            expect(note.text).toBe('my new note')
        })

        it('should throw error on non userId', () => {
            expect(() => logic.updateNote()).toThrowError('userId is not a string')
        })

        it('should throw error on empty userId', () => {
            expect(() => logic.updateNote('')).toThrowError('userId is empty or blank')
        })

        it('should throw error on blank userId', () => {
            expect(() => logic.updateNote('      ')).toThrowError('userId is empty or blank')
        })

        it('should throw error on wrong userId', () => {
            const id = logic.addNote(userId, 'my note')

            expect(() => logic.updateNote('wrong-id', id, 'my new note')).toThrowError(`note with id ${id} does not exist for userId wrong-id`)
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
            const id = logic.addNote(userId, 'my note')

            expect(() => logic.updateNote(userId, 'wrong-id', 'my new note')).toThrowError(`note with id wrong-id does not exist for userId ${userId}`)
        })

        it('should throw error on no text', () => {
            expect(() => logic.updateNote(userId, '123')).toThrowError('text is not a string')
        })

        it('should throw error on empty text', () => {
            expect(() => logic.updateNote(userId, '123', '')).toThrowError('text is empty or blank')
        })

        it('should throw error on blank text', () => {
            expect(() => logic.updateNote(userId, '123', '             ')).toThrowError('text is empty or blank')
        })
    })

    false && describe('search notes', () => {
        it('should return results on matching text', () => {
            expect(_notes.length).toBe(0)

            const id1 = logic.addNote(userId, 'my note 1')
            const id2 = logic.addNote(userId, 'my note 11')
            const id3 = logic.addNote(userId, 'my note 111')

            let res = logic.findNotes('456', '11')

            expect(res).toBeDefined()
            expect(res.length).toBe(0)

            res = logic.findNotes(userId, '11')

            expect(res).toBeDefined()
            expect(res.length).toBe(2)

            const [note1, note2] = res

            expect(note1).toBeDefined()
            expect(note1.id).toBe(id2)
            expect(note1.text).toBe('my note 11')
            expect(note1.userId).toBe(userId)

            expect(note2).toBeDefined()
            expect(note2.id).toBe(id3)
            expect(note2.text).toBe('my note 111')
            expect(note2.userId).toBe(userId)
        })

        it('should return results on matching text case', () => {
            expect(_notes.length).toBe(0)

            const id1 = logic.addNote(userId, 'my note a')
            const id2 = logic.addNote(userId, 'my note aA')
            const id3 = logic.addNote(userId, 'my note aAa')

            let res = logic.findNotes('456', '11')

            expect(res).toBeDefined()
            expect(res.length).toBe(0)

            res = logic.findNotes(userId, 'aA')

            expect(res).toBeDefined()
            expect(res.length).toBe(2)

            const [note1, note2] = res

            expect(note1).toBeDefined()
            expect(note1.id).toBe(id2)
            expect(note1.text).toBe('my note aA')
            expect(note1.userId).toBe(userId)

            expect(note2).toBeDefined()
            expect(note2.id).toBe(id3)
            expect(note2.text).toBe('my note aAa')
            expect(note2.userId).toBe(userId)
        })

        it('should throw error on no text', () => {
            expect(() => logic.findNotes(userId)).toThrowError('text is not a string')
        })

        it('should throw error on empty text', () => {
            expect(() => logic.findNotes(userId, '')).toThrowError('text is empty')
        })

        it('should throw error on no text', () => {
            expect(() => logic.findNotes(userId)).toThrowError('text is not a string')
        })

        it('should throw error on empty text', () => {
            expect(() => logic.findNotes(userId, '')).toThrowError('text is empty')
        })
    })
})

