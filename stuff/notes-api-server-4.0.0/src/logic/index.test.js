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

                            notes.forEach(({ _id, userId, text }) => {
                                expect(validIds.includes(_id.toString())).toBeTruthy()
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
                .then(({ _id, userId, text }) => {
                    expect(_id.toString()).toBe(_note._id.toString())
                    expect(userId).toBe(_userId)
                    expect(text).toBe(noteText)

                    return logic.retrieveNote(wrongUserId, _id.toString())
                        .catch(({ message }) => expect(message).toBe(`note with id ${_id} does not exist for userId ${wrongUserId}`))
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

                            notes.forEach(({ _id, userId, text }) => {
                                expect(validIds.includes(_id.toString())).toBeTruthy()
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

                            notes.forEach(({ _id, userId, text }) => {
                                expect(ids.includes(_id.toString())).toBeTruthy()
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

