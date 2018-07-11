'use strict'

const { models: { User, Apartment, Task, Note, Market } } = require('data')

const logic = {

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} phone
     * @param {string} dni
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     * 
     * @throws {Error} - If not valid name, surname, phone, dni, password
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

                return User.findOne({ dni })
                    .then(user => {


                        if (user) throw Error(`user with dni ${dni} already exists`)

                        return User.create({ name, surname, phone, dni, password, apartmentId })
                            .then(() => true)
                    })
            })
    },

    /**
     * 
     * @param {string} dni
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     * 
     * @throws {Error} - If not valid dni, password
     */
    authenticateUser(dni, password) {
        return Promise.resolve()
            .then(() => {

                if (typeof dni !== 'string') throw Error('user dni is not a string')

                if (!(dni = dni.trim()).length) throw Error('user dni is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return User.findOne({ dni, password })
                    .then(user => {


                        if (!user) throw Error('wrong credentials')

                        return { id: user.id, apartmentId: user.apartmentId }
                    })
            })
    },

    /**
    * 
    * @param {string} id
    * 
    * @returns {Promise<User>} 
    * 
    * @throws {Error} - If not valid id
    */
    retrieveUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                return User.findById(id).select({ _id: 0, name: 1, surname: 1, phone: 1, dni: 1 })
            })
            .then(user => {
                if (!user) throw Error(`no user found with id ${id}`)

                return user
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
    * 
    * @throws {Error} - If not valid id, name, surname, phone, dni, password, newPassword
    */
    updateUser(id, name, surname, phone, dni, password, newPassword ) {
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

                return User.findById(id )
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                return user
            })
            .then(user => {
                user.name = name
                user.surname = surname
                user.phone=phone
                user.dni=dni
                user.password = newPassword ? newPassword : password

                return user.save()
            })
            .then(() => true)
    },
    /**
     * 
     * @param {string} userId 
     * @param {string} taskId
     *
     * @returns {Promise<User>} 
     * 
     * @throws {Error} - If not valid userId, taskId
     */
    relateUserTask(userId, taskId){
        return Promise.resolve()
        .then(()=>{
            if (typeof userId !== 'string') throw Error('user userId is not a string')

            if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank')
            
            if (typeof taskId !== 'string') throw Error('user taskId is not a string')

            if (!(taskId = taskId.trim()).length) throw Error('user taskId is empty or blank')
        })
        .then(() => User.findById( userId )
        )
        .then(user =>{
            if (!user) throw Error('wrong credentials')
           return user
        })
        .then(user =>{
            if (!user.taskId || user.taskId === ''){
                
                Task.findById(taskId)
                
                .then(task =>{
                    if(task.apartmentId.toString() === user.apartmentId.toString()) {
                        user.taskId = taskId;
                        user.save()
                        return user; 
                    }
                })
            }
           return user
        })
    },
   
   
    /**
     * 
     * @param {string} tasks 
     * @param {string} users
     *
     * @returns newAssociation
     * 
     */
    doAssociations(tasks, users) {
        let newAssociation = [];
        let usersInUse = users.slice();
        tasks.forEach(task => {
            const notAssociatedUsers = usersInUse.filter(user => JSON.stringify(user.taskId) !== JSON.stringify(task.id) ? user.id : null );
            if (notAssociatedUsers.length === 0) {
                newAssociation = this.doAssociations(tasks, users)
            } else {
                var randomUser = notAssociatedUsers[Math.floor(Math.random()*notAssociatedUsers.length)];
                newAssociation.push({
                    taskId: task.id,
                    userId: randomUser.id
                });
                usersInUse = usersInUse.filter(user => JSON.stringify(user.id) !== JSON.stringify(randomUser.id));
            }
        });
      return newAssociation;
    },
    

     /**
     * 
     * @param {string} apartmentId 
     *
     * @returns {Promise<boolean>}
     */
    rotateUsersTasks(apartmentId){
        return Promise.resolve()
            .then(() => 
                Task.find({ apartmentId })
                    .then(tasks => 
                        User.find({ apartmentId })
                            .then(users => {
                            
                                const newAssociation = this.doAssociations(tasks, users);

                                users.forEach(user => 
                                    User.update({_id: user.id}, { $unset: { taskId: null } })
                                    .then(() => {
                                        const selectedAssociation = newAssociation.find(association =>
                                            JSON.stringify(association.userId) === JSON.stringify(user.id)
                                        );
                                        if (selectedAssociation) {
                                            User.update({_id: selectedAssociation.userId},{ taskId: selectedAssociation.taskId} )
                                            .then(() => true)
                                        }
                                    })
                                )
                             })
                    )
            )
    },

     /**
     * 
     * @param {string} apartmentId
     * 
     * 
     * @returns {promise<users>}
     * 
     * @throws {Error} - If not valid apartmentId
     */
    listUsers(apartmentId) {

        return Promise.resolve()
        .then(()=>{
            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')

            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')
            .then(() => {
                return User.find({ apartmentId })
                    .then(users => {
                        if (!users) throw Error(`no users found`)

                        return users
                    })

            })
    })
},

    /**
     * 
     * @param {string} id 
     * 
     * @returns {Promise<boolean>}
     * 
     * @throws {Error} - If not valid id
     */
    unregisterUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')
                
                return User.findByIdAndRemove({ _id : id })
            })
           
            .then(() => true)
    },
     /**
     * 
     * @param {string} name 
     * @param {string} address
     * @param {string} phone 
     * 
     * @returns {Promise<id>}
     * 
     * @throws {Error} - If not valid name, address, phone
     */
    registerApartment(name, address, phone) {
        return Promise.resolve()
            .then(() => {

                if (typeof name !== 'string') throw Error('user name is not a string')

                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof address !== 'string') throw Error('user address is not a string')

                if (!(address = address.trim()).length) throw Error('user address is empty or blank')

                if (typeof phone !== 'string') throw Error('user phone is not a string')

                if ((phone = phone.trim()).length === 0) throw Error('user phone is empty or blank')

              
                return Apartment.create({ name, address, phone })
                    .then(({ id }) => {
                        return id

                    })
            })
    },
    /**
     * 
     * @param {string} name 
     * @param {string} address
     * @param {string} phone 
     * @param {string} owner
     * @param {string} realState
     * 
     * @returns {Promise<bolean>}
     * 
     * @throws {Error} - If not valid id, name, address, phone, owner, realState 
     */
    updateApartment(id, name, address, phone, owner, realState  ) {
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

                return Apartment.findById(id )
            })
            .then(apartment => {
                if (!apartment) throw Error('wrong credentials')

                if (apartment.id !== id) throw Error(`no apartment found with id ${id} for given credentials`)

                return apartment
            })
            .then(apartment => {
                
                apartment.name = name
                apartment.address = address
                apartment.phone=phone
                apartment.owner=owner
                apartment.realState = realState
                

                return Apartment.update({_id: apartment.id}, { name:apartment.name, address:apartment.address, phone:apartment.phone, owner: apartment.owner, realState: apartment.realState }, { multi: true } )
                
            })
            .then(() => true)
    },
     /**
     * 
     * @param {string} apartmentId
     * 
     * @returns {Promise<apartment>}
     * 
     * @throws {Error} - If not valid apartmentId 
     */
    apartmentExists(apartmentId) {
        return Promise.resolve()
        .then(()=>{
            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')

            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')
            .then(() => {
                return Apartment.findById(apartmentId)
                    .then(apartment => {
                        if (!apartment) throw Error(`no apartment found`)
                        return apartment
                    })
            })
    })
},

  /**
     * 
     * @param {string} apartmentId
     * 
     * @returns {Promise<apartments>}
     * 
     * @throws {Error} - If not valid apartmentId 
     */
    listApartment(apartmentId) {

        return Promise.resolve()
        .then(()=>{
            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')

            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')
            .then(() => {
                return Apartment.findById(apartmentId)
                    .then(apartments => {
                        if (!apartments) throw Error(`no apartment found`)

                        return apartments
                    })
            })

    })
},

    /**
     * 
     * @param {string} apartmentId
     * 
     * @returns {Promise<bolean>}
     * 
     * @throws {Error} - If not valid apartmentId 
     */
    deleteApartment(apartmentId) {
        return Promise.resolve()
        .then(()=>{
            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')

            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')

            .then(() => {        
            return Apartment.findById({ _id: apartmentId })
                .then((apartment) => {
                    const id = apartment._id
                    return User.deleteMany( {"apartmentId":id })
                        .then(() => {
                            
                            if (!apartment) throw Error(`no apartment found`)

                            return apartment.remove()
                        })
                        .then(() => true)
                })
            })
        })
    },
    /**
     * 
     * @param {string} name
     * @param {string} apartmentId
     * 
     * 
     * @returns {Promise<id>}
     * 
     * @throws {Error} - If not valid name, apartmentId 
     */
    addTasks(name, apartmentId) {
        return Promise.resolve()
        .then(()=>{
            if (typeof name !== 'string') throw Error('user name is not a string')

            if (!(name = name.trim()).length) throw Error('user name is empty or blank')

            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')

            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')

            .then(() => {

                return Task.create({ name, apartmentId })
                    .then(task => {


                        if (!task) throw Error('wrong credentials')

                        return { id: task.id }
                    })
            })

    })
},
    /**
     * 
     * @param {string} apartmentId
     * 
     * @returns {Promise<tasks>}
     * 
     * @throws {Error} - If not valid apartmentId 
     */
    listTasks(apartmentId) {
        return Promise.resolve()
        .then(()=>{
             
            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')

            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')

        })
            .then(() => {
                return Task.find({ apartmentId })
                    .then(tasks => {
                        if (!tasks) throw Error(`no tasks found`)

                        return tasks
                    })
            })
    },
      /**
     * 
     * @param {string} taskId
     * 
     * @throws {Error} - If not valid apartmentId 
     */
    deleteTask(taskId) {
 
        return Promise.resolve()
        .then(()=>{
             
            if (typeof taskId !== 'string') throw Error('user taskId is not a string')

            if (!(taskId = taskId.trim()).length) throw Error('user taskId is empty or blank')

        })
            .then(() => {
                return Task.findById(taskId)
            })
            .then(task => {
                if (!task) throw Error('wrong credentials')
                
                if (task.id !== taskId) throw Error(`no task found with id ${taskId} for given credentials`)
                    return Task.findByIdAndRemove({ _id: taskId })
                        .then(() => {

                            return User.findOne({"taskId": taskId})
                            .then( user =>{

                               User.update({_id: user.id}, { $unset: { taskId: null } }).then(() => true)
                             
                        })
                })
                        
                    
         })
    },

     /**
     * 
     * @param {string} name
     * @param {string} apartmentId
     * 
     * 
     * @returns {Promise<id>}
     * 
     * @throws {Error} - If not valid name, apartmentId 
     */
    addMarket(name, apartmentId) {
        return Promise.resolve()
        .then(()=>{
            if (typeof name !== 'string') throw Error('user name is not a string')

            if (!(name = name.trim()).length) throw Error('user name is empty or blank')

            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')

            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')
        })
            .then(() => {

                return Market.create({ name, apartmentId })
                    .then(market => {


                        if (!market) throw Error('wrong credentials')

                        return { id: market.id }
                    })
            })

    },
      /**
     * 
     * @param {string} apartmentId
     * 
     *  @returns {Promise<market>}
     * 
     * @throws {Error} - If not valid apartmentId 
     */
    listMarket(apartmentId) {
        return Promise.resolve()
        .then(()=>{
            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')
    
            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')

        })
            .then(() => {
                return Market.find({ apartmentId })
                    .then(market => {
                        if (!market) throw Error(`no things found`)
                        return market
                    })
            })
    },

    /**
     * 
     * @param {string} marketId
     * 
     *  @returns {Promise<boolean>}
     * 
     * @throws {Error} - If not valid marketId 
     */
    deleteMarket(marketId) {

        return Promise.resolve()
        .then(()=>{
            if (typeof marketId !== 'string') throw Error('user marketId is not a string')
    
            if (!(marketId = marketId.trim()).length) throw Error('user marketId is empty or blank')
        })
            .then(() => {
                return Market.findById(marketId)
            })
            .then(market => {
                if (!market) throw Error('wrong credentials')

                if (market.id !== marketId) throw Error(`no things found with id ${marketId} for given credentials`)

                return Market.findByIdAndRemove({ _id: marketId })
                    .then(() => true)

            })
    },
     /**
     * 
     * @param {string} name
     * @param {string} apartmentId
     * 
     *  @returns {Promise<id>}
     * 
     * @throws {Error} - If not valid name, apartmentId 
     */
    addNotes(name, apartmentId) {
        return Promise.resolve()
        .then(()=>{
            if (typeof name !== 'string') throw Error('user name is not a string')
    
            if (!(name = name.trim()).length) throw Error('user name is empty or blank')

            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')
    
            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')
        })
            .then(() => {

                return Note.create({ name, apartmentId })
                    .then(note => {


                        if (!note) throw Error('wrong credentials')

                        return { id: note.id }
                    })
            })

    },
      /**
     * 
     * @param {string} apartmentId
     * 
     *  @returns {Promise<notes>}
     * 
     * @throws {Error} - If not valid apartmentId 
     */
    listNotes(apartmentId) {
        return Promise.resolve()
        .then(()=>{
           
            if (typeof apartmentId !== 'string') throw Error('user apartmentId is not a string')
    
            if (!(apartmentId = apartmentId.trim()).length) throw Error('user apartmentId is empty or blank')
        })
            .then(() => {
                return Note.find({ apartmentId })
                    .then(notes => {
                        if (!notes) throw Error(`no notes found`)

                        return notes
                    })
            })
    },
     /**
     * 
     * @param {string} noteId
     * 
     *  @returns {Promise<boolean>}
     * 
     * @throws {Error} - If not valid noteId 
     */
    deleteNote(noteId) {

        return Promise.resolve()
        .then(()=>{
           
            if (typeof noteId !== 'string') throw Error('user noteId is not a string')
    
            if (!(noteId = noteId.trim()).length) throw Error('user noteId is empty or blank')
        })
            .then(() => {
                return Note.findById(noteId)
            })
            .then(note => {
                if (!note) throw Error('wrong credentials')

                if (note.id !== noteId) throw Error(`no note found with id ${noteId} for given credentials`)

                return Note.findByIdAndRemove({ _id: noteId })
                    .then(() => true)

            })
    }
}

module.exports = logic
