'use strict'

const axios = require('axios')

const shApi = {
    url: 'NOWHERE',

    token(token){
        if(token){
            this._token = token
            return
        }
        return this._token
    },
        apartmentId: 'NO-ID',
        userId:'NO-ID',
        noteId:'No-ID',
        taskId:'No-ID',
        marketId:'No-ID',
        
    
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

    registerUser(name, surname, phone, dni, password, apartmentId) {
        
        return Promise.resolve()
            .then(() => {

              
                if (typeof name !== 'string') throw Error('name is not a string')

                if (!(name = name.trim()).length) throw Error('name is empty or blank')

                if (typeof surname !== 'string') throw Error('surname is not a string')

                if (!(surname = surname.trim())) throw Error('surname is empty or blank')

                if (typeof phone !== 'string') throw Error('phone is not a string')

                if ((phone = phone.trim()).length === 0) throw Error('phone is empty or blank')

                if (typeof dni !== 'string') throw Error('dni is not a string')

                if ((dni = dni.trim()).length === 0) throw Error('dni is empty or blank')

                if (typeof password !== 'string') throw Error('password is not a string')

                if ((password = password.trim()).length === 0) throw Error('password is empty or blank')
                
                if (typeof apartmentId !== 'string') throw Error('apartmentId is not a string')

                if ((apartmentId = apartmentId.trim()).length === 0) throw Error('apartmentId is empty or blank')

                
                return axios.post(`${this.url}/registeruser/${apartmentId}`,{ name, surname, phone, dni, password} )
                .then(({ status, data }) => {
                    if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    return true
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
            })
    },
    
    /**
     * 
     * @param {string} dni
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser(dni, password) {
        return Promise.resolve()
            .then(() => {
                
                if (typeof dni !== 'string') throw Error('user dni is not a string')

                if (!(dni = dni.trim()).length) throw Error('user dni is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')
                
                return axios.post(`${this.url}/auth`, { dni, password })
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    const { data: { user, token } } = data

                    this.token(token)

                    this.userId==data.id

                    return user
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
            })
    },

     /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

  

                return axios.get(`${this.url}/users/${id}`, { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    
                    return data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
            })
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
    updateUser(id, name, surname, phone, dni, password, newPassword) {
       
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof name !== 'string') throw Error('user name is not a string')

                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('user surname is not a string')

                if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank')

                if (typeof phone !== 'string') throw Error('user phone is not a string')

                if (!(phone = phone.trim()).length) throw Error('user phone is empty or blank')

                if (typeof dni !== 'string') throw Error('user dni is not a string')

                if (!(dni = dni.trim()).length) throw Error('user dni is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.patch(`${this.url}/users/${id}`, { name, surname, phone, dni, password, newPassword },{ headers: { authorization: `Bearer ${this.token()}`}})
                .then(({ status, data }) => {

                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return true
                })
                .catch(err => {

                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
                
            })
            
    },

     /**
     * 
     * 
     * 
     * @returns {Promise<User>} 
     */
    listUsers(apartmentId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.get(`${this.url}/list/${apartmentId}`, { headers: { authorization: `Bearer ${this.token()}`}} )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
            })
    },

    /**
     * 
     * @param {string} id 
     * @param {string} dni
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser(userId) {
        return Promise.resolve()
            .then(() => {
                
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                
                return axios.delete(`${this.url}/users/${userId}`, { headers: { authorization: `Bearer ${this.token()}` } })

                .then(({ status, data }) => {

                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return true
                })
                .catch(err => {

                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
            })
            
    },
   
    registerApartment(name, address, phone){
        return Promise.resolve()
        .then(() => {

            if (typeof name !== 'string') throw Error('user name is not a string')

            if (!(name = name.trim()).length) throw Error('user name is empty or blank')

            if (typeof address !== 'string') throw Error('user address is not a string')

            if (!(address = address.trim()).length) throw Error('user address is empty or blank')

            if (typeof phone !== 'string') throw Error('user phone is not a string')

            if ((phone = phone.trim()).length === 0) throw Error('user phone is empty or blank')


            return axios.post(`${this.url}/register`, {name, address, phone})
            .then (({status, data}) =>{
             

                if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                this.apartmentId=data.data
                return data
               
            })
            .catch(err => {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                if (err.response) {
                    const { response: { data: { error: message } } } = err

                    throw Error(message)
                } else throw err
            
            })
        })
    },
    listApartment(apartmentId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.get(`${this.url}/listapartment/${apartmentId}`, { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    },
    updateApartment(id, name, address, phone, owner, realState) {
       
        return Promise.resolve()
            .then(() => {

                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof name !== 'string') throw Error('user name is not a string')

                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof address !== 'string') throw Error('user address is not a string')

                if ((address = address.trim()).length === 0) throw Error('user address is empty or blank')

                if (typeof phone !== 'string') throw Error('user phone is not a string')

                if (!(phone = phone.trim()).length) throw Error('user phone is empty or blank')

                if (typeof owner !== 'string') throw Error('user owner is not a string')

                if (!(owner = owner.trim()).length) throw Error('user owner is empty or blank')

                if (typeof realState !== 'string') throw Error('user realState is not a string')

                if ((realState = realState.trim()).length === 0) throw Error('user realState is empty or blank')

                return axios.patch(`${this.url}/updateapartment/${id}`, { name, address, phone, owner, realState},{ headers: { authorization: `Bearer ${this.token()}`}})
                .then(({ status, data }) => {

                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return true
                })
                .catch(err => {

                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
                
            })
            
    },
    listExistingApartment(apartmentId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.get(`${this.url}/apartment/${apartmentId}`, { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    
                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    },
    deleteApartment(apartmentId) {
        return Promise.resolve()
        .then(() => {
            
                return axios.delete(`${this.url}/listapartment/${apartmentId}`,  { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    return true
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    },
    addTasks(name, apartmentId){
        return axios.post(`${this.url}/task/${apartmentId}`, {name, apartmentId },  { headers: { authorization: `Bearer ${this.token()}` } } )
            .then (({status, data}) =>{
                if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                
                this.taskId=data.data
                
                return data.data
               
            })
            .catch(err => {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                if (err.response) {
                    const { response: { data: { error: message } } } = err

                    throw Error(message)
                } else throw err
            
            })
    },
    listTasks(apartmentId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.get(`${this.url}/task/${apartmentId}`, { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    
                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    }, rotateUsersTasks(apartmentId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.patch(`${this.url}/task/${apartmentId}`, {},  { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    
                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    },


    relateUserTask(userId, taskId) {
        return Promise.resolve()
        .then(() => {
           
            return axios.patch(`${this.url}/user/${userId}/task/${taskId}`, {}, { headers: { authorization: `Bearer ${this.token()}` } } )
            .then(({ status, data }) => {
                if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                return data
            })
            .catch(err => {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                if (err.response) {
                    const { response: { data: { error: message } } } = err

                    throw Error(message)
                    
                } else throw err
            })
        })
    },
    deleteTask(taskId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.delete(`${this.url}/task/${taskId}`, { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    return true
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    },
    addMarket(name, apartmentId){
        return axios.post(`${this.url}/market/${apartmentId}`, {name, apartmentId },  { headers: { authorization: `Bearer ${this.token()}` } } )
            .then (({status, data}) =>{
                if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                
                this.marketId=data.data
              
                return data
               
            })
            .catch(err => {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                if (err.response) {
                    const { response: { data: { error: message } } } = err

                    throw Error(message)
                } else throw err
            
            })
    },
    listMarket(apartmentId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.get(`${this.url}/market/${apartmentId}`, { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    },
   

    deleteMarket(marketId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.delete(`${this.url}/market/${marketId}`, { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    return true
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    },
    addNotes(name, apartmentId){
        return axios.post(`${this.url}/note/${apartmentId}`, {name, apartmentId },  { headers: { authorization: `Bearer ${this.token()}` } } )
            .then (({status, data}) =>{
                if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                this.noteId=data.data
              
                return data
               
            })
            .catch(err => {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                if (err.response) {
                    const { response: { data: { error: message } } } = err

                    throw Error(message)
                } else throw err
            
            })
    },
    listNotes(apartmentId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.get(`${this.url}/note/${apartmentId}`, { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    },

    deleteNote(noteId) {
        return Promise.resolve()
            .then(() => {
               
                return axios.delete(`${this.url}/note/${noteId}`, { headers: { authorization: `Bearer ${this.token()}` } } )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                    return true
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                        
                    } else throw err
                })
            })
    },
}

module.exports = shApi