'use strict'

describe('logic (project-app)', () => {

    var formData = {
        username: 'user',
        password: 'pass'
    }

    var formData2 = {
        username: 'user',
        password: 'pass',
        newPassword: 'pass2',
    }

    var formData3 = {
        username: 'user',
        password: 'pass2'
    }


    describe('register', () => {

        logic.id = ''
        logic.token = ''

        it('should return status "ok"', done => {
            logic.register(formData)
                .then(data => {
                    expect(data).toBeDefined()
                    expect(data instanceof Object).toBeTruthy()
                    expect(Object.keys(data).length).toBe(2)
                    expect(data.status).toEqual('OK')
                    logic.id = data.data.id; 
                    done()
                })
                .catch(done)
        })

          it(`login should return status ("OK"), id (${logic.id}) and defined token`, done => {
            logic.login(formData)
                .then(data => {
                    expect(data).toBeDefined()
                    expect(data instanceof Object).toBeTruthy()
                    expect(Object.keys(data).length).toBe(2)
                    expect(data.status).toEqual('OK')
                    expect(data.data.id).toEqual(logic.id)
                    expect(data.data.token).toBeDefined()
                    logic.token = data.data.token; 
                    done()
                })
                .catch(done)
            
        }) 

         it(`login should return status ("OK"), id (${logic.id}) and username ("user")`, done => {
            logic.retrieve()
                .then(data => {
                    expect(data).toBeDefined()
                    expect(data instanceof Object).toBeTruthy()
                    expect(Object.keys(data).length).toBe(2)
                    expect(data.status).toEqual('OK')
                    expect(data.data.username).toEqual('user')
                    expect(data.data.id).toEqual(logic.id)
                    done()
                })
                .catch(done)
        })

        it('should update --> return status ("OK"))', done => {
            logic.update(formData2)
                .then(data => {
                    expect(data).toBeDefined()
                    expect(data instanceof Object).toBeTruthy()
                    expect(Object.keys(data).length).toBe(1)
                    expect(data.status).toEqual('OK')
                    done()
                })
                .catch(done)
        })

        it('should unregister --> return status ("OK"))', done => {
            logic.unregister(formData3)
                .then(data => {
                    expect(data).toBeDefined()
                    expect(data instanceof Object).toBeTruthy()
                    expect(Object.keys(data).length).toBe(1)
                    expect(data.status).toEqual('OK')
                    done()
                })
                .catch(done)
        }) 
    })
})