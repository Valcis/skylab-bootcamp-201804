'use strict'

const shApi = require('api')

//shApi.url = 'http://localhost:4000/api'

shApi.url = 'https://sleepy-citadel-80519.herokuapp.com/api'

const logic = {
    userId: 'NO-ID',
    data: 'NO-DATA',
    users: 'NO-USERS',
    apartmentId: 'NO-ID',
    apartment: 'NO-APARTMENT',
    tasks:'NO-TASK',
    notes:'NO-NOTES',
    noteId:'',
    marketId:'',


    registerUser(name, surname, phone, dni, password, apartmentId) {
        
        return shApi.registerUser(name, surname, phone, dni, password, apartmentId)
            .then((res) => true)
    },

    authenticateUser(dni, password) {
        return shApi.authenticateUser(dni, password)
            .then(user => {
                localStorage.setItem('apartmentId', user.apartmentId)
                localStorage.setItem('userId', user.id)

                this.userId =user.id
                return this.userId
            })
    },

    retrieveUser(id) {
        return shApi.retrieveUser(id)
            .then(res => {

                this.data = res.data

                return this.data
            })
    },

    updateUser(id, name, surname, phone, dni, password, newPassword) {
        return shApi.updateUser(id, name, surname, phone, dni, password, newPassword)
            .then(users => {

                return users
            })
    },
    listUsers(apartmentId) {
        return shApi.listUsers(apartmentId)
        .then(res => {
            this.users = res
            return this.users
        })
    },

    unregisterUser(id) {
        return shApi.unregisterUser(id)
            .then(() => true)
    },

    registerApartment(name, address, phone){
        return shApi.registerApartment(name, address, phone)
        .then(apartId => {

            localStorage.setItem('apartmentId', apartId.data)
            
            this.apartmentId=apartId.data

            return this.apartmentId
        })
        .catch(({message}) => console.log(message))
    },

    listApartment(apartmentId) {
        return shApi.listApartment(apartmentId)
        .then(res => {
            this.apartment = res
            return this.apartment
        })
    },
    updateApartment(id, name, address, phone, owner, realState) {
        return shApi.updateApartment(id, name, address, phone, owner, realState)
            .then(apartment => {

                return apartment
            })
    },

    listExistingApartment(apartmentId) {
        return shApi.listExistingApartment(apartmentId)
        .then(res => {
            this.apartment = res
            return this.apartment
        })
    },
    deleteApartment(apartmentId){
        return shApi.deleteApartment(apartmentId)
        .then(()=>{
            return true
        })
    },
    addTasks(name, apartmentId){
        return shApi.addTasks(name, apartmentId)
        .then(id => id)

     
    },
    listTasks(apartmentId){
        return shApi.listTasks(apartmentId)
        .then(res=> {
            this.tasks = res
            return this.tasks
        })
    },
    rotateUsersTasks(apartmentId){
        return shApi.rotateUsersTasks(apartmentId)
        .then(res=> {
            this.tasks = res
            return this.tasks
        })
    },
    
    
    relateUserTask(userId, taskId){
        return shApi.relateUserTask(userId, taskId)
        .then(user => user)
    },
    
    deleteTask(taskId){
        return shApi.deleteTask(taskId)
        .then(() => {
            return true
        })
    },
    addMarket(name, apartmentId){
        return shApi.addMarket(name, apartmentId)
        .then(data => {
            localStorage.setItem('marketId', data.data.id)
            
            this.marketId=data.data.id

            return this.marketId
        })
        .catch(({message}) => console.log(message))
    },
    listMarket(apartmentId){
        return shApi.listMarket(apartmentId)
        .then(res=> {
            this.market = res
            return this.market
        })
    },

    deleteMarket(marketId){
        return shApi.deleteMarket(marketId)
        .then(() => {
            return true
        })
    },

    addNotes(name, apartmentId){
        return shApi.addNotes(name, apartmentId)
        .then(data => {
            localStorage.setItem('noteId', data.data.id)
            
            this.noteId=data.data.id

            return this.noteId
        })
        .catch(({message}) => console.log(message))
    },
    listNotes(apartmentId){
        return shApi.listNotes(apartmentId)
        .then(res=> {
            this.notes = res
            return this.notes
        })
    },

    deleteNote(noteId){
        return shApi.deleteNote(noteId)
        .then(() => {
            return true
        })
    }
}

module.exports = logic