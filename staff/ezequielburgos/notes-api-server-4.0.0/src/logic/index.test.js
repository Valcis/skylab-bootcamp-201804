// 'use strict'

// const { MongoClient, ObjectId } = require('mongodb')
// const expect = require('expect')
// const logic = require('.')

// describe('logic (notes)', () => {
//     let cn, db, cl
//     const userId = '123'

//     before(done => {
//         MongoClient.connect('mongodb://localhost:27017/skylab-bootcamp-201804-test', { useNewUrlParser: true }, (err, conn) => {
//             if (err) throw err

//             cn = conn
//             db = cn.db()
//             cl = db.collection('notes')

//             logic.init(db)

//             done()
//         })
//     })

//     // beforeEach(done => {
//     //     cl.deleteMany()
//     //         .then(() => done())
//     // })

//     beforeEach(() => cl.deleteMany())

//     after(done => db.dropDatabase(() => cn.close(done)))

//     describe('add note', () => {
//         it('should add on correct data', () =>
//             logic.addNote(userId, 'my note')
//                 .then(id => {
//                     expect(id).toBeDefined()

//                     return cl.findOne({ _id: ObjectId(id) })
//                         .then(note => {
//                             expect(note._id).toBeDefined()
//                             expect(note._id.toString()).toBe(id)
//                             expect(note.userId).toBe(userId)
//                             expect(note.text).toBe('my note')
//                         })
//                 })
//         )

//         it('should add notes with different ids', (done) => {
//             const p1 = logic.addNote(userId, `my note 1`)
//             const p2 = logic.addNote(userId, `my note 2`)
//             const p3 = logic.addNote(userId, `my note 3`)

//             Promise.all([p1, p2, p3])
//                 .then(id => {
//                     expect(id[0]).not.toBe(id[1])
//                     expect(id[1]).not.toBe(id[2])
//                     expect(id[2]).not.toBe(id[0])

//                     cl.findOne({ _id: ObjectId(id[0]) }).then(note => {
//                         expect(note.text).toBe(`my note 1`)
//                         expect(note.userId).toBe(`123`)
//                     })
//                     cl.findOne({ _id: ObjectId(id[1]) }).then(note => {
//                         expect(note.text).toBe(`my note 2`)
//                         expect(note.userId).toBe(`123`)
//                     })
//                     cl.findOne({ _id: ObjectId(id[2]) }).then(note => {
//                         expect(note.text).toBe(`my note 3`)
//                         expect(note.userId).toBe(`123`)
//                     })
//                     // cl.findOne({ _id: ObjectId(id[2]) }).then(note => console.log(note))
//                     done()
//                 })
//         })

//         false && it('should throw error on no userId', () =>
//             logic.addNote()
//                 .catch(({ message }) => expect(message).toBe('userId is not a string'))
//         )

//         false && it('should throw error on empty userId', () => {
//             logic.addNote('')
//                 .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
//             // expect(() => logic.addNote('')).toThrowError('userId is empty or blank')
//         })

//         false && it('should throw error on blank userId', () => {
//             logic.addNote('   ')
//                 .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
//         })

//         false && it('should throw error on no text', () => {
//             logic.addNote(userId)
//                 .catch(({ message }) => expect(message).toBe('text is not a string'))
//         })

//         false && it('should throw error on empty text', () => {
//             logic.addNote(userId, '')
//                 .catch(({ message }) => expect(message).toBe('text is empty or blank'))
//         })

//         false && it('should throw error on blank text', () => {
//             logic.addNote(userId, '   ')
//                 .catch(({ message }) => expect(message).toBe('text is empty or blank'))
//         })
//     })

//     describe('list notes', () => {
//         false && it('should succeed on correct data', () => {

//             const ids = []
//             ids.push(logic.addNote(userId, 'my note 1'))
//             ids.push(logic.addNote(userId, 'my note 2'))
//             ids.push(logic.addNote(userId, 'my note 3'))

//             const userId2 = '456'

//             const ids2 = []
//             ids2.push(logic.addNote(userId2, 'my note 4'))
//             ids2.push(logic.addNote(userId2, 'my note 5'))
//             ids2.push(logic.addNote(userId2, 'my note 6'))
//             ids2.push(logic.addNote(userId2, 'my note 7'))

//             // const notes = logic.listNotes(userId)


//             // notes.forEach((note, index) => {
//             //     expect(note.id).toBe(ids[index])
//             //     expect(note.userId).toBe(userId)
//             //     expect(note.text).toBe(`my note ${index + 1}`)
//             // })

//             // const notes2 = logic.listNotes(userId2)

//             // expect(notes2.length).toBe(4)

//             // notes2.forEach((note, index) => {
//             //     expect(note.id).toBe(ids2[index])
//             //     expect(note.userId).toBe(userId2)
//             //     expect(note.text).toBe(`my note ${index + 4}`)
//             // })
//         })

//         false && it('should throw error on non userId', () => {
//             logic.listNotes()
//                 .catch(({ message }) => expect(message).toBe('userId is not a string'))

//         })

//         false && it('should throw error on empty userId', () => {
//             logic.listNotes('')
//                 .catch(({ message }) => expect(message).toBe('userId is empty or blank'))

//         })

//         false && it('should throw error on blank userId', () => {
//             logic.listNotes('      ')
//                 .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
//             // expect(() => logic.listNotes('      ')).toThrowError('userId is empty or blank')
//         })
//     })

//     describe('retrieve note', () => {
//         it('should succeed on correct data', () => {

//             cl.insertOne({ userId, text: 'my note' })
//                 .then(res => {
//                     // const _id = res.insertedId
//                     const _id = res.ops[0]._id

//                     logic.retrieveNote(userId, _id.toString()).then(note => {
//                         // console.log(note)
//                         expect(note).toBeDefined()
//                         expect(note.userId).toBe('123')
//                         expect(note.text).toBe('my note')
//                         expect(() => logic.retrieveNote('456', note._id)).toThrowError(`note with id ${_id} does not exist`)
//                     })

//                 })

//             // const note = logic.retrieveNote(userId, id)


//             // expect(note.id).toBe(id)
//             // expect(note.userId).toBe(userId)


//             // expect(() => logic.retrieveNote('456', id)).toThrowError(`note with id ${id} does not exist`)

//         })

//         false && it('should throw error on non userId', () => {
//             logic.retrieveNote()
//                 .catch(({ message }) => expect(message).toBe('userId is not a string'))
//         })

//         false && it('should throw error on empty userId', () => {
//             logic.retrieveNote('')
//                 .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
//         })

//         false && it('should throw error on blank userId', () => {
//             logic.retrieveNote('   ')
//                 .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
//         })

//         false && it('should throw error on wrong userId', () => {
//             const id = logic.addNote(userId, 'my note')

//             expect(() => logic.retrieveNote('wrong-id', id)).toThrowError(`note wfalse && ith id ${id} does not exist for userId wrong-id`)
//         })

//         false && it('should throw error on no id', () => {
//             logic.retrieveNote()
//                 .catch(({ message }) => expect(message).toBe('userId is not a string'))
//             // expect(() => logic.retrieveNote(userId)).toThrowError('id is not a string')
//         })

//         false && it('should throw error on empty id', () => {
//             logic.retrieveNote()
//                 .catch(({ message }) => expect(message).toBe('userId is not a string'))
//             // expect(() => logic.retrieveNote(userId, '')).toThrowError('id is empty or blank')
//         })

//         false && it('should throw error on blank id', () => {
//             logic.retrieveNote()
//                 .catch(({ message }) => expect(message).toBe('userId is not a string'))
//             // expect(() => logic.retrieveNote(userId, '             ')).toThrowError('id is empty or blank')
//         })

//         false && it('should throw error on wrong id', () => {
//             const id = logic.addNote(userId, 'my note')

//             expect(() => logic.retrieveNote(userId, 'wrong-id')).toThrowError(`note with id wrong-id does not exist for userId ${userId}`)
//         })
//     })

//     false && describe('remove note', () => {
//         it('should remove a note', () => {
//             expect(_notes.length).toBe(0)

//             const id = logic.addNote(userId, 'my note')

//             expect(_notes.length).toBe(1)

//             expect(() => logic.removeNote('wrong-id', id)).toThrowError(`note with id ${id} does not exist for userId wrong-id`)

//             logic.removeNote(userId, id)

//             expect(_notes.length).toBe(0)
//             expect(_notes).toBe(logic._notes)
//         })

//         it('should throw error on non userId', () => {
//             expect(() => logic.removeNote()).toThrowError('userId is not a string')
//         })

//         it('should throw error on empty userId', () => {
//             expect(() => logic.removeNote('')).toThrowError('userId is empty or blank')
//         })

//         it('should throw error on blank userId', () => {
//             expect(() => logic.removeNote('      ')).toThrowError('userId is empty or blank')
//         })

//         it('should throw error on wrong userId', () => {
//             const id = logic.addNote(userId, 'my note')

//             expect(() => logic.removeNote('wrong-id', id)).toThrowError(`note with id ${id} does not exist for userId wrong-id`)
//         })

//         it('should throw error on no id', () => {
//             expect(() => logic.removeNote(userId)).toThrowError('id is not a string')
//         })

//         it('should throw error on empty id', () => {
//             expect(() => logic.removeNote(userId, '')).toThrowError('id is empty or blank')
//         })

//         it('should throw error on blank id', () => {
//             expect(() => logic.removeNote(userId, '             ')).toThrowError('id is empty or blank')
//         })

//         it('should throw error on wrong id', () => {
//             const id = logic.addNote(userId, 'my note')

//             expect(() => logic.removeNote(userId, 'wrong-id')).toThrowError(`note with id wrong-id does not exist for userId ${userId}`)
//         })
//     })

//     false && describe('update note', () => {
//         it('should succeed on correct data', () => {
//             expect(_notes.length).toBe(0)

//             const id = logic.addNote(userId, 'my note')

//             expect(_notes.length).toBe(1)

//             expect(() => logic.updateNote('wrong-id', id, 'my new note')).toThrowError(`note with id ${id} does not exist for userId wrong-id`)

//             logic.updateNote(userId, id, 'my new note')

//             expect(_notes.length).toBe(1)

//             const [note] = _notes

//             expect(note.userId).toBe(userId)
//             expect(note.id).toBe(id)
//             expect(note.text).toBe('my new note')
//         })

//         it('should throw error on non userId', () => {
//             expect(() => logic.updateNote()).toThrowError('userId is not a string')
//         })

//         it('should throw error on empty userId', () => {
//             expect(() => logic.updateNote('')).toThrowError('userId is empty or blank')
//         })

//         it('should throw error on blank userId', () => {
//             expect(() => logic.updateNote('      ')).toThrowError('userId is empty or blank')
//         })

//         it('should throw error on wrong userId', () => {
//             const id = logic.addNote(userId, 'my note')

//             expect(() => logic.updateNote('wrong-id', id, 'my new note')).toThrowError(`note with id ${id} does not exist for userId wrong-id`)
//         })

//         it('should throw error on no id', () => {
//             expect(() => logic.updateNote(userId)).toThrowError('id is not a string')
//         })

//         it('should throw error on empty id', () => {
//             expect(() => logic.updateNote(userId, '')).toThrowError('id is empty or blank')
//         })

//         it('should throw error on blank id', () => {
//             expect(() => logic.updateNote(userId, '             ')).toThrowError('id is empty or blank')
//         })

//         it('should throw error on wrong id', () => {
//             const id = logic.addNote(userId, 'my note')

//             expect(() => logic.updateNote(userId, 'wrong-id', 'my new note')).toThrowError(`note with id wrong-id does not exist for userId ${userId}`)
//         })

//         it('should throw error on no text', () => {
//             expect(() => logic.updateNote(userId, '123')).toThrowError('text is not a string')
//         })

//         it('should throw error on empty text', () => {
//             expect(() => logic.updateNote(userId, '123', '')).toThrowError('text is empty or blank')
//         })

//         it('should throw error on blank text', () => {
//             expect(() => logic.updateNote(userId, '123', '             ')).toThrowError('text is empty or blank')
//         })
//     })

//     false && describe('search notes', () => {
//         it('should return results on matching text', () => {
//             expect(_notes.length).toBe(0)

//             const id1 = logic.addNote(userId, 'my note 1')
//             const id2 = logic.addNote(userId, 'my note 11')
//             const id3 = logic.addNote(userId, 'my note 111')

//             let res = logic.findNotes('456', '11')

//             expect(res).toBeDefined()
//             expect(res.length).toBe(0)

//             res = logic.findNotes(userId, '11')

//             expect(res).toBeDefined()
//             expect(res.length).toBe(2)

//             const [note1, note2] = res

//             expect(note1).toBeDefined()
//             expect(note1.id).toBe(id2)
//             expect(note1.text).toBe('my note 11')
//             expect(note1.userId).toBe(userId)

//             expect(note2).toBeDefined()
//             expect(note2.id).toBe(id3)
//             expect(note2.text).toBe('my note 111')
//             expect(note2.userId).toBe(userId)
//         })

//         it('should return results on matching text case', () => {
//             expect(_notes.length).toBe(0)

//             const id1 = logic.addNote(userId, 'my note a')
//             const id2 = logic.addNote(userId, 'my note aA')
//             const id3 = logic.addNote(userId, 'my note aAa')

//             let res = logic.findNotes('456', '11')

//             expect(res).toBeDefined()
//             expect(res.length).toBe(0)

//             res = logic.findNotes(userId, 'aA')

//             expect(res).toBeDefined()
//             expect(res.length).toBe(2)

//             const [note1, note2] = res

//             expect(note1).toBeDefined()
//             expect(note1.id).toBe(id2)
//             expect(note1.text).toBe('my note aA')
//             expect(note1.userId).toBe(userId)

//             expect(note2).toBeDefined()
//             expect(note2.id).toBe(id3)
//             expect(note2.text).toBe('my note aAa')
//             expect(note2.userId).toBe(userId)
//         })

//         it('should throw error on no text', () => {
//             expect(() => logic.findNotes(userId)).toThrowError('text is not a string')
//         })

//         it('should throw error on empty text', () => {
//             expect(() => logic.findNotes(userId, '')).toThrowError('text is empty')
//         })

//         it('should throw error on no text', () => {
//             expect(() => logic.findNotes(userId)).toThrowError('text is not a string')
//         })

//         it('should throw error on empty text', () => {
//             expect(() => logic.findNotes(userId, '')).toThrowError('text is empty')
//         })
//     })
// })

'use strict'

const { MongoClient, ObjectId } = require('mongodb')
const expect = require('expect')
const logic = require('.')

describe('logic (notes)', () => {
    let cn, db, cl
    const _userId = '123'
    const noteText = 'my note'
    const indexes = []

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

    beforeEach(() => {
        let count = 10 + Math.floor(Math.random() * 10)
        indexes.length = 0
        while (count--) indexes.push(count)

        return cl.deleteMany()
    })

    after(done => db.dropDatabase(() => cn.close(done)))

    describe('add note', () => {
        it('should add on correct data', () =>
            logic.addNote(_userId, noteText)
                .then(id => {
                    expect(id).toBeDefined()

                    return cl.findOne({ _id: ObjectId(id) })
                        .then(({ _id, userId, text }) => {
                            expect(_id).toBeDefined()
                            expect(_id.toString()).toBe(id)
                            expect(userId).toBe(_userId)
                            expect(text).toBe(noteText)
                        })
                })
        )

        it('should add notes with different ids', () => {
            const additions = indexes.map(index => logic.addNote(_userId, `${noteText} ${index}`))

            return Promise.all(additions)
                .then(ids => {
                    expect(ids.length).toBe(indexes.length)

                    for (let i = 0; i < ids.length; i++)
                        for (let j = i + 1; j < ids.length; j++)
                            expect(ids[i]).not.toBe(ids[j])

                    const retrievals = ids.map(id => cl.findOne({ _id: ObjectId(id) }))

                    return Promise.all(retrievals)
                        .then(notes => {
                            expect(notes.length).toBe(indexes.length)

                            notes.forEach(({ _id, userId, text }, index) => {
                                expect(_id.toString()).toBe(ids[index])
                                expect(userId).toBe(_userId)
                                expect(text).toBe(`${noteText} ${indexes[index]}`)
                            })
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
            logic.addNote('     ')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on no text', () => {
            logic.addNote(_userId)
                .catch(({ message }) => expect(message).toBe('text is not a string'))
        })

        it('should throw error on empty text', () =>
            logic.addNote(_userId, '')
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        )

        it('should throw error on blank text', () =>
            logic.addNote(_userId, '   ')
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        )
    })

    describe('list notes', () => {
        it('should succeed on correct data', () => {
            let additions = indexes.map(index => cl.insertOne({ userId: _userId, text: `${noteText} ${index}` }).then(res => res.insertedId.toString()))

            const _userId2 = '456'

            additions = additions.concat(indexes.map(index => cl.insertOne({ userId: _userId2, text: `${noteText} ${index + indexes.length}` }).then(res => res.insertedId.toString())))

            return Promise.all(additions)
                .then(ids => {
                    return logic.listNotes(_userId)
                        .then(notes => {
                            expect(notes.length).toBe(indexes.length)

                            const validIds = ids.slice(0, indexes.length)
                            const validTexts = indexes.map(index => `${noteText} ${index}`)

                            notes.forEach(({ id, userId, text }) => {
                                expect(validIds.includes(id)).toBeTruthy()
                                expect(userId).toBe(_userId)
                                expect(validTexts.includes(text)).toBeTruthy()
                            })
                        })
                })
        })

        it('should throw error on non userId', () =>
            logic.listNotes()
                .catch(({ message }) => expect(message).toBe('userId is not a string'))
        )

        it('should throw error on empty userId', () =>
            logic.listNotes('')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on blank userId', () =>
            logic.listNotes('      ')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )
    })

    describe('retrieve note', () => {
        it('should succeed on correct data', () => {
            const _note = { text: noteText, userId: _userId }
            const wrongUserId = '456'

            return cl.insertOne(_note)
                .then(() => logic.retrieveNote(_userId, _note._id.toString()))
                .then(({ id, userId, text }) => {
                    expect(id).toBe(_note._id.toString())
                    expect(userId).toBe(_userId)
                    expect(text).toBe(noteText)

                    return logic.retrieveNote(wrongUserId, id)
                        .catch(({ message }) => expect(message).toBe(`note with id ${id} does not exist for userId ${wrongUserId}`))
                })
        })

        it('should throw error on non userId', () =>
            logic.retrieveNote()
                .catch(({ message }) => expect(message).toBe('userId is not a string'))
        )

        it('should throw error on empty userId', () =>
            logic.retrieveNote('')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on blank userId', () =>
            logic.retrieveNote('      ')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on wrong userId', () =>
            cl.insertOne({ userId: _userId, text: noteText })
                .then(res => res.insertedId.toString())
                .then(id => {
                    const wrongUserId = 'wrong-id'

                    return logic.retrieveNote(wrongUserId, id)
                        .catch(({ message }) => expect(message).toBe(`note with id ${id} does not exist for userId ${wrongUserId}`))
                })
        )

        it('should throw error on no id', () =>
            logic.retrieveNote(_userId)
                .catch(({ message }) => expect(message).toBe('id is not a string'))
        )

        it('should throw error on empty id', () =>
            logic.retrieveNote(_userId, '')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )

        it('should throw error on blank id', () =>
            logic.retrieveNote(_userId, '       ')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )

        it('should throw error on wrong id', () =>
            cl.insertOne({ userId: _userId, text: noteText })
                .then(res => res.insertedId.toString())
                .then(id => {
                    const wrongNoteId = '123456781234567812345678'

                    return logic.retrieveNote(_userId, wrongNoteId)
                        .catch(({ message }) => expect(message).toBe(`note with id ${wrongNoteId} does not exist for userId ${_userId}`))
                })
        )
    })

    describe('remove note', () => {
        it('should remove a note', () => {
            const _note = { text: noteText, userId: _userId }
            const wrongUserId = '456'

            return cl.insertOne(_note)
                .then(() => logic.removeNote(wrongUserId, _note._id.toString()))
                .catch(({ message }) => expect(message).toBe(`note with id ${_note._id} does not exist for userId ${wrongUserId}`))
                .then(() => logic.removeNote(_userId, _note._id.toString()))
                .then(() => cl.findOne({ _id: _note._id, userId: _userId }))
                .then(note => expect(note).toBeNull())
        })

        it('should throw error on non userId', () =>
            logic.removeNote()
                .catch(({ message }) => expect(message).toBe('userId is not a string'))
        )

        it('should throw error on empty userId', () =>
            logic.removeNote('')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on blank userId', () =>
            logic.removeNote('      ')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on wrong userId', () =>
            cl.insertOne({ userId: _userId, text: noteText })
                .then(res => res.insertedId.toString())
                .then(id => {
                    const wrongUserId = 'wrong-id'

                    return logic.removeNote(wrongUserId, id)
                        .catch(({ message }) => expect(message).toBe(`note with id ${id} does not exist for userId ${wrongUserId}`))
                })
        )

        it('should throw error on no id', () =>
            logic.removeNote(_userId)
                .catch(({ message }) => expect(message).toBe('id is not a string'))
        )

        it('should throw error on empty id', () =>
            logic.removeNote(_userId, '')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )

        it('should throw error on blank id', () =>
            logic.removeNote(_userId, '       ')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )

        it('should throw error on wrong id', () =>
            cl.insertOne({ userId: _userId, text: noteText })
                .then(res => res.insertedId.toString())
                .then(id => {
                    const wrongNoteId = '123456781234567812345678'

                    return logic.removeNote(_userId, wrongNoteId)
                        .catch(({ message }) => expect(message).toBe(`note with id ${wrongNoteId} does not exist for userId ${_userId}`))
                })
        )
    })

    describe('update note', () => {
        it('should succeed on correct data', () => {
            const _note = { text: noteText, userId: _userId }
            const wrongUserId = '456'
            const newNoteText = 'my new note'

            return cl.insertOne(_note)
                .then(() => logic.updateNote(wrongUserId, _note._id.toString(), newNoteText))
                .catch(({ message }) => expect(message).toBe(`note with id ${_note._id} does not exist for userId ${wrongUserId}`))
                .then(() => logic.updateNote(_userId, _note._id.toString(), newNoteText))
                .then(() => cl.findOne({ _id: _note._id, userId: _userId }))
                .then(({ _id, userId, text }) => {
                    expect(_id.toString()).toBe(_note._id.toString())
                    expect(userId).toBe(_userId)
                    expect(text).toBe(newNoteText)
                })
        })

        it('should throw error on non userId', () =>
            logic.updateNote()
                .catch(({ message }) => expect(message).toBe('userId is not a string'))
        )

        it('should throw error on empty userId', () =>
            logic.updateNote('')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on blank userId', () =>
            logic.updateNote('      ')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on wrong userId', () =>
            cl.insertOne({ userId: _userId, text: noteText })
                .then(res => res.insertedId.toString())
                .then(id => {
                    const wrongUserId = 'wrong-id'

                    return logic.updateNote(wrongUserId, id, 'my new note')
                        .catch(({ message }) => expect(message).toBe(`note with id ${id} does not exist for userId ${wrongUserId}`))
                })
        )

        it('should throw error on no id', () =>
            logic.updateNote(_userId)
                .catch(({ message }) => expect(message).toBe('id is not a string'))
        )

        it('should throw error on empty id', () =>
            logic.updateNote(_userId, '')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )

        it('should throw error on blank id', () =>
            logic.updateNote(_userId, '       ')
                .catch(({ message }) => expect(message).toBe('id is empty or blank'))
        )

        it('should throw error on wrong id', () =>
            cl.insertOne({ userId: _userId, text: noteText })
                .then(res => res.insertedId.toString())
                .then(id => {
                    const wrongNoteId = '123456781234567812345678'

                    return logic.updateNote(_userId, wrongNoteId, 'my new note')
                        .catch(({ message }) => expect(message).toBe(`note with id ${wrongNoteId} does not exist for userId ${_userId}`))
                })
        )

        it('should throw error on no text', () =>
            logic.updateNote(_userId, '123')
                .catch(({ message }) => expect(message).toBe('text is not a string'))
        )

        it('should throw error on empty text', () =>
            logic.updateNote(_userId, '123', '')
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        )

        it('should throw error on blank text', () =>
            logic.updateNote(_userId, '123', '             ')
                .catch(({ message }) => expect(message).toBe('text is empty or blank'))
        )
    })

    describe('find notes', () => {
        it('should return results on matching text', () => {
            let additions = indexes.map(index => cl.insertOne({ userId: _userId, text: `${noteText} ${index}` }).then(res => res.insertedId.toString()))

            const anotherNoteText = 'another note'

            additions = [...additions, ...indexes.map(index => cl.insertOne({ userId: _userId, text: `${anotherNoteText} ${index + indexes.length}` }).then(res => res.insertedId.toString()))]

            return Promise.all(additions)
                .then(ids => {
                    return logic.findNotes(_userId, noteText)
                        .then(notes => {
                            expect(notes.length).toBe(indexes.length)

                            const validIds = ids.slice(0, indexes.length)
                            const validTexts = indexes.map(index => `${noteText} ${index}`)

                            notes.forEach(({ id, userId, text }) => {
                                expect(validIds.includes(id)).toBeTruthy()
                                expect(userId).toBe(_userId)
                                expect(validTexts.includes(text)).toBeTruthy()
                            })
                        })
                })
        })

        it('should return results on matching text case', () => {
            const additions = []

            additions.push(cl.insertOne({ userId: _userId, text: 'my note a' }).then(res => res.insertedId.toString()))
            additions.push(cl.insertOne({ userId: _userId, text: 'my note aA' }).then(res => res.insertedId.toString()))
            additions.push(cl.insertOne({ userId: _userId, text: 'my note aAa' }).then(res => res.insertedId.toString()))

            const wrongUserId = '456'

            return Promise.all(additions)
                .then(ids => {
                    return logic.findNotes(wrongUserId, 'aA')
                    .then(notes => {
                            expect(notes).toBeDefined()
                            expect(notes instanceof Array).toBeTruthy()
                            expect(notes.length).toBe(0)

                            return logic.findNotes(_userId, 'aA')
                        })
                        .then(notes => {
                            expect(notes).toBeDefined()
                            expect(notes.length).toBe(2)

                            const validTexts = ['my note aA', 'my note aAa']

                            notes.forEach(({ id, userId, text }) => {
                                expect(ids.includes(id)).toBeTruthy()
                                expect(userId).toBe(_userId)
                                expect(validTexts.includes(text)).toBeTruthy()
                            })
                        })
                })
        })

        it('should throw error on non userId', () =>
            logic.findNotes()
                .catch(({ message }) => expect(message).toBe('userId is not a string'))
        )

        it('should throw error on empty userId', () =>
            logic.findNotes('')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on blank userId', () =>
            logic.findNotes('      ')
                .catch(({ message }) => expect(message).toBe('userId is empty or blank'))
        )

        it('should throw error on no text', () =>
            logic.findNotes(_userId)
                .catch(({ message }) => expect(message).toBe('text is not a string'))
        )

        it('should throw error on empty text', () =>
            logic.findNotes(_userId, '')
                .catch(({ message }) => expect(message).toBe('text is empty'))
        )
    })
})