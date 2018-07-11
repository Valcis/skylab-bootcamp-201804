'use strict';

var axios = require('axios');

var shApi = {
    url: 'NOWHERE',

    token: function token(_token) {
        if (_token) {
            this._token = _token;
            return;
        }
        return this._token;
    },

    apartmentId: 'NO-ID',
    userId: 'NO-ID',
    noteId: 'No-ID',
    taskId: 'No-ID',
    marketId: 'No-ID',

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} phone
     * @param {string} dni
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */

    registerUser: function registerUser(name, surname, phone, dni, password, apartmentId) {
        var _this = this;

        return Promise.resolve().then(function () {

            if (typeof name !== 'string') throw Error('name is not a string');

            if (!(name = name.trim()).length) throw Error('name is empty or blank');

            if (typeof surname !== 'string') throw Error('surname is not a string');

            if (!(surname = surname.trim())) throw Error('surname is empty or blank');

            if (typeof phone !== 'string') throw Error('phone is not a string');

            if ((phone = phone.trim()).length === 0) throw Error('phone is empty or blank');

            if (typeof dni !== 'string') throw Error('dni is not a string');

            if ((dni = dni.trim()).length === 0) throw Error('dni is empty or blank');

            if (typeof password !== 'string') throw Error('password is not a string');

            if ((password = password.trim()).length === 0) throw Error('password is empty or blank');

            if (typeof apartmentId !== 'string') throw Error('apartmentId is not a string');

            if ((apartmentId = apartmentId.trim()).length === 0) throw Error('apartmentId is empty or blank');

            return axios.post(_this.url + '/registeruser/' + apartmentId, { name: name, surname: surname, phone: phone, dni: dni, password: password }).then(function (_ref) {
                var status = _ref.status,
                    data = _ref.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} dni
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser: function authenticateUser(dni, password) {
        var _this2 = this;

        return Promise.resolve().then(function () {

            if (typeof dni !== 'string') throw Error('user dni is not a string');

            if (!(dni = dni.trim()).length) throw Error('user dni is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.post(_this2.url + '/auth', { dni: dni, password: password }).then(function (_ref2) {
                var status = _ref2.status,
                    data = _ref2.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                var _data$data = data.data,
                    user = _data$data.user,
                    token = _data$data.token;


                _this2.token(token);

                _this2.userId == data.id;

                return user;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
    * 
    * @param {string} id
    * 
    * @returns {Promise<User>} 
    */
    retrieveUser: function retrieveUser(id) {
        var _this3 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            return axios.get(_this3.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this3.token() } }).then(function (_ref3) {
                var status = _ref3.status,
                    data = _ref3.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },

    /**
    * 
    * @param {string} id 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} phone
    * @param {string} dni
    * @param {string} password 
    * @param {string} newPhone
    * @param {string} newPassword 
    * 
    * @returns {Promise<boolean>}
    */
    updateUser: function updateUser(id, name, surname, phone, dni, password, newPassword) {
        var _this4 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof name !== 'string') throw Error('user name is not a string');

            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof surname !== 'string') throw Error('user surname is not a string');

            if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank');

            if (typeof phone !== 'string') throw Error('user phone is not a string');

            if (!(phone = phone.trim()).length) throw Error('user phone is empty or blank');

            if (typeof dni !== 'string') throw Error('user dni is not a string');

            if (!(dni = dni.trim()).length) throw Error('user dni is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.patch(_this4.url + '/users/' + id, { name: name, surname: surname, phone: phone, dni: dni, password: password, newPassword: newPassword }, { headers: { authorization: 'Bearer ' + _this4.token() } }).then(function (_ref4) {
                var status = _ref4.status,
                    data = _ref4.data;


                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {

                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
    * 
    * 
    * 
    * @returns {Promise<User>} 
    */
    listUsers: function listUsers(apartmentId) {
        var _this5 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this5.url + '/list/' + apartmentId, { headers: { authorization: 'Bearer ' + _this5.token() } }).then(function (_ref5) {
                var status = _ref5.status,
                    data = _ref5.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} id 
     * @param {string} dni
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser: function unregisterUser(userId) {
        var _this6 = this;

        return Promise.resolve().then(function () {

            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            return axios.delete(_this6.url + '/users/' + userId, { headers: { authorization: 'Bearer ' + _this6.token() } }).then(function (_ref6) {
                var status = _ref6.status,
                    data = _ref6.data;


                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {

                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    registerApartment: function registerApartment(name, address, phone) {
        var _this7 = this;

        return Promise.resolve().then(function () {

            if (typeof name !== 'string') throw Error('user name is not a string');

            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof address !== 'string') throw Error('user address is not a string');

            if (!(address = address.trim()).length) throw Error('user address is empty or blank');

            if (typeof phone !== 'string') throw Error('user phone is not a string');

            if ((phone = phone.trim()).length === 0) throw Error('user phone is empty or blank');

            return axios.post(_this7.url + '/register', { name: name, address: address, phone: phone }).then(function (_ref7) {
                var status = _ref7.status,
                    data = _ref7.data;


                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                _this7.apartmentId = data.data;
                return data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    listApartment: function listApartment(apartmentId) {
        var _this8 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this8.url + '/listapartment/' + apartmentId, { headers: { authorization: 'Bearer ' + _this8.token() } }).then(function (_ref8) {
                var status = _ref8.status,
                    data = _ref8.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    updateApartment: function updateApartment(id, name, address, phone, owner, realState) {
        var _this9 = this;

        return Promise.resolve().then(function () {

            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof name !== 'string') throw Error('user name is not a string');

            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof address !== 'string') throw Error('user address is not a string');

            if ((address = address.trim()).length === 0) throw Error('user address is empty or blank');

            if (typeof phone !== 'string') throw Error('user phone is not a string');

            if (!(phone = phone.trim()).length) throw Error('user phone is empty or blank');

            if (typeof owner !== 'string') throw Error('user owner is not a string');

            if (!(owner = owner.trim()).length) throw Error('user owner is empty or blank');

            if (typeof realState !== 'string') throw Error('user realState is not a string');

            if ((realState = realState.trim()).length === 0) throw Error('user realState is empty or blank');

            return axios.patch(_this9.url + '/updateapartment/' + id, { name: name, address: address, phone: phone, owner: owner, realState: realState }, { headers: { authorization: 'Bearer ' + _this9.token() } }).then(function (_ref9) {
                var status = _ref9.status,
                    data = _ref9.data;


                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {

                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    listExistingApartment: function listExistingApartment(apartmentId) {
        var _this10 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this10.url + '/apartment/' + apartmentId, { headers: { authorization: 'Bearer ' + _this10.token() } }).then(function (_ref10) {
                var status = _ref10.status,
                    data = _ref10.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    deleteApartment: function deleteApartment(apartmentId) {
        var _this11 = this;

        return Promise.resolve().then(function () {

            return axios.delete(_this11.url + '/listapartment/' + apartmentId, { headers: { authorization: 'Bearer ' + _this11.token() } }).then(function (_ref11) {
                var status = _ref11.status,
                    data = _ref11.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    addTasks: function addTasks(name, apartmentId) {
        var _this12 = this;

        return axios.post(this.url + '/task/' + apartmentId, { name: name, apartmentId: apartmentId }, { headers: { authorization: 'Bearer ' + this.token() } }).then(function (_ref12) {
            var status = _ref12.status,
                data = _ref12.data;

            if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

            _this12.taskId = data.data;

            return data.data;
        }).catch(function (err) {
            if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

            if (err.response) {
                var message = err.response.data.error;


                throw Error(message);
            } else throw err;
        });
    },
    listTasks: function listTasks(apartmentId) {
        var _this13 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this13.url + '/task/' + apartmentId, { headers: { authorization: 'Bearer ' + _this13.token() } }).then(function (_ref13) {
                var status = _ref13.status,
                    data = _ref13.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    rotateUsersTasks: function rotateUsersTasks(apartmentId) {
        var _this14 = this;

        return Promise.resolve().then(function () {

            return axios.patch(_this14.url + '/task/' + apartmentId, {}, { headers: { authorization: 'Bearer ' + _this14.token() } }).then(function (_ref14) {
                var status = _ref14.status,
                    data = _ref14.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    relateUserTask: function relateUserTask(userId, taskId) {
        var _this15 = this;

        return Promise.resolve().then(function () {

            return axios.patch(_this15.url + '/user/' + userId + '/task/' + taskId, {}, { headers: { authorization: 'Bearer ' + _this15.token() } }).then(function (_ref15) {
                var status = _ref15.status,
                    data = _ref15.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    deleteTask: function deleteTask(taskId) {
        var _this16 = this;

        return Promise.resolve().then(function () {

            return axios.delete(_this16.url + '/task/' + taskId, { headers: { authorization: 'Bearer ' + _this16.token() } }).then(function (_ref16) {
                var status = _ref16.status,
                    data = _ref16.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    addMarket: function addMarket(name, apartmentId) {
        var _this17 = this;

        return axios.post(this.url + '/market/' + apartmentId, { name: name, apartmentId: apartmentId }, { headers: { authorization: 'Bearer ' + this.token() } }).then(function (_ref17) {
            var status = _ref17.status,
                data = _ref17.data;

            if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

            _this17.marketId = data.data;

            return data;
        }).catch(function (err) {
            if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

            if (err.response) {
                var message = err.response.data.error;


                throw Error(message);
            } else throw err;
        });
    },
    listMarket: function listMarket(apartmentId) {
        var _this18 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this18.url + '/market/' + apartmentId, { headers: { authorization: 'Bearer ' + _this18.token() } }).then(function (_ref18) {
                var status = _ref18.status,
                    data = _ref18.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    deleteMarket: function deleteMarket(marketId) {
        var _this19 = this;

        return Promise.resolve().then(function () {

            return axios.delete(_this19.url + '/market/' + marketId, { headers: { authorization: 'Bearer ' + _this19.token() } }).then(function (_ref19) {
                var status = _ref19.status,
                    data = _ref19.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    addNotes: function addNotes(name, apartmentId) {
        var _this20 = this;

        return axios.post(this.url + '/note/' + apartmentId, { name: name, apartmentId: apartmentId }, { headers: { authorization: 'Bearer ' + this.token() } }).then(function (_ref20) {
            var status = _ref20.status,
                data = _ref20.data;

            if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
            _this20.noteId = data.data;

            return data;
        }).catch(function (err) {
            if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

            if (err.response) {
                var message = err.response.data.error;


                throw Error(message);
            } else throw err;
        });
    },
    listNotes: function listNotes(apartmentId) {
        var _this21 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this21.url + '/note/' + apartmentId, { headers: { authorization: 'Bearer ' + _this21.token() } }).then(function (_ref21) {
                var status = _ref21.status,
                    data = _ref21.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    deleteNote: function deleteNote(noteId) {
        var _this22 = this;

        return Promise.resolve().then(function () {

            return axios.delete(_this22.url + '/note/' + noteId, { headers: { authorization: 'Bearer ' + _this22.token() } }).then(function (_ref22) {
                var status = _ref22.status,
                    data = _ref22.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    }
};

module.exports = shApi;
