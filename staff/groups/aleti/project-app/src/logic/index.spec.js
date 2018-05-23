describe('logic (project-app)', () => {

    it('should create, login and unregister user', () => {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let body = { "username": user, "password": password }

        logic.registerUser(body)
        .then((registerUserRes)=>{
            expect(registerUserRes).toBeDefined();
            expect(registerUserRes.status).toEqual('OK');
            expect(registerUserRes.data.id.length).toBe(24);
            return logic.loginUser(body)
        })
        .then((loginUserRes)=>{
            expect(loginUserRes).toBeDefined();
            expect(loginUserRes.status).toEqual('OK');
            expect(loginUserRes.data.token.length).toBe(171)
            return logic.unregisterUser(body, loginUserRes.data.id, loginUserRes.data.token)
        })
        .then((unregisterUserRes) => {
            expect(unregisterUserRes).toBeDefined();
            expect(unregisterUserRes.status).toEqual('OK')
        });
    });

    it('should not create user with password empty', function (done) {

        let user = 'user' + Date.now()
        let body = { "username": user, "password": "" }

        logic.registerUser(body)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('KO');
                done()
            })
            .catch(done)
    });

    it('should not create user without password', function (done) {

        let user = 'user' + Date.now()
        let body = { "username": user }

        logic.registerUser(body)
            .catch(err => {
                expect(err).toBeDefined()
                expect(err.message).toBe('Input body not valid')

                done()
            })
    });

    it('should not create user without body', function (done) {

        logic.registerUser()
            .catch(err => {
                expect(err).toBeDefined()
                expect(err.message).toBe('Input body not valid')

                done()
            })
    });

    it('should not login user with wrong password', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let registerBody = { "username": user, "password": password }
        let loginBody = { "username": user, "password": "p" }

        logic.registerUser(registerBody)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(loginBody)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('KO');
                        logic.loginUser(registerBody)
                            .then((loginUserRes) => {
                                expect(loginUserRes).toBeDefined();
                                expect(loginUserRes.status).toEqual('OK');
                                expect(loginUserRes.data.token.length).toBe(171)
                                logic.unregisterUser(registerBody, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            });
                    });
            })
            .catch(done)
    });

    it('should not login user with wrong username', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let registerBody = { "username": user, "password": password }
        let loginBody = { "username": 'user' + Date.now, "password": password }

        logic.registerUser(registerBody)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(loginBody)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('KO');
                        logic.loginUser(registerBody)
                            .then((loginUserRes) => {
                                expect(loginUserRes).toBeDefined();
                                expect(loginUserRes.status).toEqual('OK');
                                expect(loginUserRes.data.token.length).toBe(171)
                                logic.unregisterUser(registerBody, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            });
                    });
            })
            .catch(done)
    });

    it('should not login user without password', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let registerBody = { "username": user, "password": password }
        let loginBody = { "username": user }

        logic.registerUser(registerBody)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(loginBody)
                    .catch(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('Input body not valid')
                        logic.loginUser(registerBody)
                            .then((loginUserRes) => {
                                expect(loginUserRes).toBeDefined();
                                expect(loginUserRes.status).toEqual('OK');
                                expect(loginUserRes.data.token.length).toBe(171)
                                logic.unregisterUser(registerBody, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            });
                    });

            })
            .catch(done)
    });

    it('should not unregister user without body', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let body = { "username": user, "password": password }

        logic.registerUser(body)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(body)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('OK');
                        expect(loginUserRes.data.token.length).toBe(171)
                        logic.unregisterUser(loginUserRes.data.id, loginUserRes.data.token)
                            .catch(err => {
                                expect(err).toBeDefined()
                                expect(err.message).toBe('Input parameter not valid')
                                logic.unregisterUser(body, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            })
                    });
            })
            .catch(done)
    });

    it('should not unregister user without token', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let body = { "username": user, "password": password }

        logic.registerUser(body)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(body)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('OK');
                        expect(loginUserRes.data.token.length).toBe(171)
                        logic.unregisterUser(body, loginUserRes.data.id)
                            .catch(err => {
                                expect(err).toBeDefined()
                                expect(err.message).toBe('Input parameter not valid')
                                logic.unregisterUser(body, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            })
                    });
            })
            .catch(done)
    });

    it('should not unregister user with wrong token', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let body = { "username": user, "password": password }

        logic.registerUser(body)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(body)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('OK');
                        expect(loginUserRes.data.token.length).toBe(171)
                        logic.unregisterUser(body, loginUserRes.data.id, 'fakdsjfldskjfñalkdsjfñadklj')
                            .then((unregisterUserRes) => {
                                expect(unregisterUserRes).toBeDefined();
                                expect(unregisterUserRes.status).toEqual('KO')
                                logic.unregisterUser(body, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            });
                    });
            })
            .catch(done)
    });

    it('should not unregister user with wrong user id', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let body = { "username": user, "password": password }

        logic.registerUser(body)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(body)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('OK');
                        expect(loginUserRes.data.token.length).toBe(171)
                        logic.unregisterUser(body, "kjhfadskjfhaldskfjhalkjh", loginUserRes.data.token)
                            .then((unregisterUserRes) => {
                                expect(unregisterUserRes).toBeDefined();
                                expect(unregisterUserRes.status).toEqual('KO')
                                logic.unregisterUser(body, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            });
                    });
            })
            .catch(done)
    });

    it('should not unregister user with wrong password', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let registerBody = { "username": user, "password": password }
        let unregisterBody = { "username": user, "password": "pldfj" }

        logic.registerUser(registerBody)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(registerBody)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('OK');
                        expect(loginUserRes.data.token.length).toBe(171)
                        logic.unregisterUser(unregisterBody, loginUserRes.data.id, loginUserRes.data.token)
                            .then((unregisterUserRes) => {
                                expect(unregisterUserRes).toBeDefined();
                                expect(unregisterUserRes.status).toEqual('KO')
                                logic.unregisterUser(registerBody, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            });
                    });
            })
            .catch(done)
    });

    it('should retrieve user', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let body = { "username": user, "password": password }

        logic.registerUser(body)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(body)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('OK');
                        expect(loginUserRes.data.token.length).toBe(171)
                        logic.retrieveUser(loginUserRes.data.id, loginUserRes.data.token)
                            .then((retrieveUserRes) => {
                                expect(retrieveUserRes).toBeDefined();
                                expect(retrieveUserRes.status).toEqual('OK');
                                expect(retrieveUserRes.data.username).toBe(user)
                                logic.unregisterUser(body, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            });
                    });
            });
    });

    it('should not retrieve user with wrong token', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let body = { "username": user, "password": password }

        logic.registerUser(body)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(body)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('OK');
                        expect(loginUserRes.data.token.length).toBe(171)
                        logic.retrieveUser(loginUserRes.data.id, 'ljkadshfkljhdfasdfadsf')
                            .then((retrieveUserRes) => {
                                expect(retrieveUserRes).toBeDefined();
                                expect(retrieveUserRes.status).toEqual('KO');
                                logic.unregisterUser(body, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            });
                    });
            });
    });

    it('should not retrieve user without token', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let body = { "username": user, "password": password }

        logic.registerUser(body)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(body)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('OK');
                        expect(loginUserRes.data.token.length).toBe(171)
                        logic.retrieveUser(loginUserRes.data.id)
                            .catch(err => {
                                expect(err).toBeDefined()
                                expect(err.message).toBe('Input parameter not valid')
                                logic.unregisterUser(body, loginUserRes.data.id, loginUserRes.data.token)
                                    .then((unregisterUserRes) => {
                                        expect(unregisterUserRes).toBeDefined();
                                        expect(unregisterUserRes.status).toEqual('OK')
                                        done()
                                    });
                            });
                    });
            });
    });

    it('should update user age', function (done) {

        let user = 'user' + Date.now()
        let password = 'pw1'

        let body = { "username": user, "password": password, "age": "30" }

        logic.registerUser(body)
            .then((registerUserRes) => {
                expect(registerUserRes).toBeDefined();
                expect(registerUserRes.status).toEqual('OK');
                expect(registerUserRes.data.id.length).toBe(24);
                logic.loginUser(body)
                    .then((loginUserRes) => {
                        expect(loginUserRes).toBeDefined();
                        expect(loginUserRes.status).toEqual('OK');
                        expect(loginUserRes.data.token.length).toBe(171)
                        logic.updateUser(body, loginUserRes.data.id, loginUserRes.data.token)
                            .then((updateUserRes) => {
                                expect(updateUserRes).toBeDefined();
                                expect(updateUserRes.status).toEqual('OK')
                                logic.retrieveUser(loginUserRes.data.id, loginUserRes.data.token)
                                    .then((retrieveUserRes) => {
                                        expect(retrieveUserRes).toBeDefined();
                                        expect(retrieveUserRes.status).toEqual('OK');
                                        expect(retrieveUserRes.data.username).toBe(user)
                                        expect(retrieveUserRes.data.age).toEqual('30')
                                        logic.unregisterUser(body, loginUserRes.data.id, loginUserRes.data.token)
                                            .then((unregisterUserRes) => {
                                                expect(unregisterUserRes).toBeDefined();
                                                expect(unregisterUserRes.status).toEqual('OK')
                                                done()
                                            });
                                    });
                            });
                    });
            });
    });

});