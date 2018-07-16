'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var axios = require('axios');

var DATE_REGEX = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');

var api = {
    url: 'NO-URL',
    token: 'NO-TOKEN',

    // FOR USERS BBDD:

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} username
     * @param {string} password 
     * @param {date} birthdate 
     * @param {string} gender
     * @param {string} address 
     * @param {string} permission
     * 
     * @returns {Promise<boolean>}
     */
    registerUser: function registerUser(name, surname, email, username, password, birthdate, gender, address, permission) {
        var _this = this;

        return Promise.resolve().then(function () {
            if (typeof name !== 'string') throw Error('user name is not a string');
            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof surname !== 'string') throw Error('user surname is not a string');
            if (!(surname = surname.trim()).length) throw Error('user surname is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');
            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof username !== 'string') throw Error('user username is not a string');
            if (!(username = username.trim()).length) throw Error('user username is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');
            if (!(password = password.trim()).length) throw Error('user password is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');
            if (!(password = password.trim()).length) throw Error('user password is empty or blank');

            console.log("birthdate en server :" + birthdate);

            if (typeof birthdate !== 'string') throw Error('user birthdate is not a string');
            if (birthdate.trim().length > 0 ? !DATE_REGEX.test(birthdate) : false) throw Error('user birthdate is not valid');

            if (typeof gender !== 'string') throw Error('user gender is not a string');
            if (gender !== "male" && gender !== "female" && gender !== "") throw Error('user gender value not admited');

            if (typeof address !== 'string') throw Error('user address is not a string');

            if (typeof permission !== 'string') throw Error('user permission is not a string');
            if (permission !== "reader" && permission !== "editor" && permission !== "admin" && permission !== "unsubscribe") throw Error('user permission value not admited');

            return axios.post(_this.url + '/users', { name: name, surname: surname, email: email, username: username, password: password, birthdate: birthdate, gender: gender, address: address, permission: permission }).then(function (_ref) {
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
    * @param {string} email 
    * @param {string} password 
    * 
    * @returns {Promise<string>}
    */
    authenticateUser: function authenticateUser(email, password) {
        var _this2 = this;

        return Promise.resolve().then(function () {
            if (typeof email !== 'string') throw Error('user email is not a string');
            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');
            if (!(password = password.trim())) throw Error('user password is empty or blank');

            return axios.post(_this2.url + '/auth', { email: email, password: password }).then(function (_ref2) {
                var status = _ref2.status,
                    data = _ref2.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                var _data$data = data.data,
                    id = _data$data.id,
                    token = _data$data.token;


                _this2.token = token;

                return id;
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

            return axios.get(_this3.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this3.token } }).then(function (_ref3) {
                var status = _ref3.status,
                    data = _ref3.data;

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
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} username
     * @param {string} password 
     * @param {date} birthdate 
     * @param {string} gender
     * @param {string} address 
     * @param {string} permission
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @returns {Promise<boolean>}
     */
    updateUser: function updateUser(id, name, surname, email, username, password, birthdate, gender, address, permission, newEmail, newPassword) {
        var _this4 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');
            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof name !== 'string') throw Error('user name is not a string');
            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof surname !== 'string') throw Error('user surname is not a string');
            if (!(surname = surname.trim()).length) throw Error('user surname is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');
            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof username !== 'string') throw Error('user username is not a string');
            if (!(username = username.trim()).length) throw Error('user username is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');
            if (!(password = password.trim()).length) throw Error('user password is empty or blank');

            if (birthdate.trim().length > 0) if (typeof birthdate !== 'date') throw Error('U_ser birthdate is not a date');

            if (typeof gender !== 'string') throw Error('user gender is not a string');
            if (gender !== "male" && gender !== "female" && gender !== "") throw Error('user gender value not admited');

            if (typeof address !== 'string') throw Error('user address is not a string');

            if (typeof permission !== 'string') throw Error('user permission is not a string');
            if (permission !== "reader" && permission !== "editor" && permission !== "admin" && permission !== "unsubscribe") throw Error('user permission value not admited');

            if (newEmail.trim().length > 0) if (typeof newEmail !== 'string') throw Error('user newEmail is not a string');

            if (newPassword.trim().length > 0) if (typeof newPassword !== 'date') throw Error('user newPassword is not a string');

            return axios.patch(_this4.url + '/users/' + id, { name: name, surname: surname, email: email, username: username, password: password, birthdate: birthdate, gender: gender, address: address, permission: permission, newEmail: newEmail, newPassword: newPassword }, { headers: { authorization: 'Bearer ' + _this4.token } }).then(function (_ref4) {
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
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser: function unregisterUser(id, email, password) {
        var _this5 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');
            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');
            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');
            if (!(password = password.trim()).length) throw Error('user password is empty or blank');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.delete(_this5.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this5.token }, data: { email: email, password: password } }).then(function (_ref5) {
                var status = _ref5.status,
                    data = _ref5.data;

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


    // FOR EXTERN NEWS API :

    /**
     * 
     * @param {string} category 
     * 
     * @returns {Promise<categoryobject>}
     */
    getExternNews: function getExternNews(category) {
        var _this6 = this;

        return Promise.resolve().then(function () {
            if (typeof category !== 'string') throw Error('category is not a string');
            if (!(category = category.trim()).length) throw Error('category is empty or blank');

            return axios.get(_this6.url + '/extnews/' + category + '/').then(function (_ref6) {
                var status = _ref6.status,
                    data = _ref6.data;

                if (status !== 200 || data.status !== 'ok') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
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


    // FOR NEWS BBDD :  

    saveItem: function saveItem(itemObject) {
        var _this7 = this;

        var title = itemObject.title,
            thumbnail = itemObject.thumbnail,
            description = itemObject.description,
            content = itemObject.content,
            categories = itemObject.categories,
            link = itemObject.link,
            pubDate = itemObject.pubDate,
            author = itemObject.author;

        var comments = [];

        return Promise.resolve().then(function () {
            if ((typeof itemObject === 'undefined' ? 'undefined' : _typeof(itemObject)) !== 'object') throw Error('itemObject is not a object');

            return axios.post(_this7.url + '/news-add', { title: title, picture: thumbnail, summary: description, content: content, category: categories, link: link, pubDate: pubDate, from: author, comments: comments }).then(function (res) {
                var status = res.status,
                    data = res.data;

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
    existOnBBDD: function existOnBBDD(newsId) {
        var _this8 = this;

        return Promise.resolve().then(function () {
            if (typeof newsId !== 'string') throw Error('newsId is not a string');
            if (!(newsId = newsId.trim())) throw Error('newsId is empty or blank');

            return axios.post(_this8.url + '/news-bbdd', { newsId: newsId }).then(function (res) {
                var status = res.status,
                    data = res.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return data.exist;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;

                    throw Error(message);
                } else throw err;
            });
        });
    },
    getNewsById: function getNewsById(newsId) {
        var _this9 = this;

        return Promise.resolve().then(function () {
            if (typeof newsId !== 'string') throw Error('newsId is not a string');
            if (!(newsId = newsId.trim())) throw Error('newsId is empty or blank');

            return axios.get(_this9.url + '/news/' + newsId).then(function (res) {
                var status = res.status,
                    data = res.data;

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


    // FOR COMMENTS BBDD :

    /**
     * 
     * @param {string} userId
     * @param {string} text 
     * 
     * @returns {Promise<string>}
     */
    addComnent: function addComnent(userId, text) {
        var _this10 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof text !== 'string') throw Error('text is not a string');

            if ((text = text.trim()).length === 0) throw Error('text is empty or blank');

            return axios.post(_this10.url + '/users/' + userId + '/notes', { text: text }, { headers: { authorization: 'Bearer ' + _this10.token } }).then(function (_ref7) {
                var status = _ref7.status,
                    data = _ref7.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data.id;
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
     * @param {string} userId
     * @param {string} noteId 
     * 
     * @returns {Promise<Comnent>}
     */
    retrieveComnent: function retrieveComnent(userId, noteId) {
        var _this11 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof noteId !== 'string') throw Error('note id is not a string');

            if (!(noteId = noteId.trim())) throw Error('note id is empty or blank');

            return axios.get(_this11.url + '/users/' + userId + '/notes/' + noteId, { headers: { authorization: 'Bearer ' + _this11.token } }).then(function (_ref8) {
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


    /**
     * @param {string} userId
     * 
     * @returns {Promise<[Comnent]>}
     */
    listComnents: function listComnents(userId) {
        var _this12 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            return axios.get(_this12.url + '/users/' + userId + '/notes', { headers: { authorization: 'Bearer ' + _this12.token } }).then(function (_ref9) {
                var status = _ref9.status,
                    data = _ref9.data;

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
     * @param {string} userId
     * @param {string} noteId 
     * @param {string} text 
     * 
     * @returns {Promise<boolean>}
     */
    updateComnent: function updateComnent(userId, noteId, text) {
        var _this13 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof noteId !== 'string') throw Error('note id is not a string');

            if (!(noteId = noteId.trim())) throw Error('note id is empty or blank');

            if (typeof text !== 'string') throw Error('text is not a string');

            if ((text = text.trim()).length === 0) throw Error('text is empty or blank');

            return axios.patch(_this13.url + '/users/' + userId + '/notes/' + noteId, { text: text }, { headers: { authorization: 'Bearer ' + _this13.token } }).then(function (_ref10) {
                var status = _ref10.status,
                    data = _ref10.data;

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
     * @param {string} userId
     * @param {string} noteId 
     *
     * @returns {Promise<boolean>}
     */
    removeComnent: function removeComnent(userId, noteId) {
        var _this14 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof noteId !== 'string') throw Error('note id is not a string');

            if (!(noteId = noteId.trim())) throw Error('note id is empty or blank');

            return axios.delete(_this14.url + '/users/' + userId + '/notes/' + noteId, { headers: { authorization: 'Bearer ' + _this14.token } }).then(function (_ref11) {
                var status = _ref11.status,
                    data = _ref11.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                debugger;
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
     * @param {string} userId
     * @param {string} text 
     * 
     * @returns {Promise<[Comnent]>}
     */
    findComnents: function findComnents(userId, text) {
        var _this15 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof text !== 'string') throw Error('text is not a string');

            if (!text.length) throw Error('text is empty');

            return axios.get(_this15.url + '/users/' + userId + '/notes?q=' + text, { headers: { authorization: 'Bearer ' + _this15.token } }).then(function (_ref12) {
                var status = _ref12.status,
                    data = _ref12.data;

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
    }
};

module.exports = api;
