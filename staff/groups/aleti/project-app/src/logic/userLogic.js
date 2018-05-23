const userLogic = {

    url: 'https://skylabcoders.herokuapp.com/api',

    loginUser(body){
        return Promise.resolve()
        .then(()=>{
            console.log(body)

            if (!body) throw Error('Input body not valid1')

            if( typeof body.username !== 'string' || typeof body.password !== 'string' ) 
                throw Error('Input body not valid2')

            return  fetch(`${this.url}/auth`, { 
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json"
                },
                method: 'POST'
            })
            .then(resp => resp.json())
        })
    },

    registerUser(body){
        return Promise.resolve()
        .then(()=>{

            if (!body) throw Error('Input body not valid')

            if( typeof body.username !== 'string' || typeof body.password !== 'string' ) 
                throw Error('Input body not valid')

            return fetch(`${this.url}/user`, { 
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json"
                },
                method: 'POST'
            })
            .then(resp => resp.json())

        })
    },

    retrieveUser(userId, token){
        return Promise.resolve()
        .then(()=>{

            if( typeof userId !== 'string' || typeof token !== 'string' ) 
                throw Error('Input parameter not valid')

            return fetch(`${this.url}/user/${userId}`, { 
                headers: {
                    "Authorization": 'Bearer ' + token
                },
                method: 'GET'
            })
            .then(resp => resp.json())

        })
    },

    unregisterUser(body, userId, token){

        return Promise.resolve()
        .then(()=>{

            if (!body) throw Error('Input body not valid')

            if( typeof body.username !== 'string' || 
                typeof body.password !== 'string' || 
                typeof userId !== 'string' ||
                typeof token !== 'string' ) 
                throw Error('Input parameter not valid')


            return fetch(`${this.url}/user/${userId}`, { 
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                    "Authorization": 'Bearer ' + token
                },
                method: 'DELETE'
            })
            .then(resp => resp.json())

        })
    },

    updateUser(body, userId, token){

        return Promise.resolve()
        .then(()=>{

            if (!body) throw Error('Input body not valid')

            if( typeof body.username !== 'string' || 
                typeof body.password !== 'string' || 
                typeof userId !== 'string' ||
                typeof token !== 'string' ) 
                throw Error('Input parameter not valid')

            return fetch(`${this.url}/user/${userId}`, { 
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                    "Authorization": 'Bearer ' + token
                },
                method: 'PUT'
            })
            .then(resp => resp.json())

        })
    }

}

export default userLogic