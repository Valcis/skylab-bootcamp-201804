'use strict'

describe('logic (github)', () => {
    let originalTimeout

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300
    })

    logic.token = '316f8c330c989ac16e9c3a0a6fa1a2b8c3c18935'

    describe('search', () => {
        it('should "tom" search get results', done => {
            logic.searchUsers('tom')
                .then(users => {
                    expect(users).toBeDefined()
                    expect(users instanceof Array).toBeTruthy()
                    expect(users.length).toBe(30)

                    done()
                })
                //.catch(err => done(err))
                .catch(done)
        })

        it('should "no-results-please" search get no results', done => {
            logic.searchUsers('no-results-please')
                .then(users => {
                    expect(users).toBeDefined()
                    expect(users instanceof Array).toBeTruthy()
                    expect(users.length).toBe(0)

                    done()
                })
                .catch(done)
        })

        it('should empty query ("") search get no results', done => {
            logic.searchUsers('')
                .then(users => {
                    expect(users).toBeDefined()
                    expect(users instanceof Array).toBeTruthy()
                    expect(users.length).toBe(0)

                    done()
                })
                .catch(done)
        })

        it('should blank query ("       ") search get no results', done => {
            logic.searchUsers('     ')
                .then(users => {
                    expect(users).toBeDefined()
                    expect(users instanceof Array).toBeTruthy()
                    expect(users.length).toBe(0)

                    done()
                })
                .catch(done)
        })

        it('should no-string query search throw error', done => {
            logic.searchUsers()
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('query is not a string')

                    done()
                })
        })
    })

    describe('retrieval', () => {
        it('should "tom" retrieval get info', done => {
            logic.retrieveUser('tom')
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.login).toBe('tom')

                    done()
                })
                .catch(done)
        })

        it('should "no-info-please" retrieval get no info', done => {
            logic.retrieveUser('no-info-please')
                .then(user => {
                    expect(user).toBeUndefined()

                    done()
                })
                .catch(done)
        })

        it('should empty ("") retrieval get no info', done => {
            logic.retrieveUser('')
                .then(user => {
                    expect(user).toBeUndefined()

                    done()
                })
                .catch(done)
        })

        it('should blank ("     ") retrieval get no info', done => {
            logic.retrieveUser('    ')
                .then(user => {
                    expect(user).toBeUndefined()

                    done()
                })
                .catch(done)
        })

        it('should no-string retrieval throw error', done => {
            logic.retrieveUser()
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('username is not a string')

                    done()
                })
        })
    })

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

})