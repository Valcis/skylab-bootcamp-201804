/**
 * This is a main object that contains the logic of the app and the call of the api.
 */
const logic = {
    url: 'https://skylabcoders.herokuapp.com',
    token: '',
    id: '',

    headers() {
        return {
            headers: { Authorization: `Bearer ${this.token}` }
        }
    },
    /**
     * This function receives a username, a password and any another field, and returns status and Id on 
     * succes or status and error on failure.
     * @example 
     * body
    *{
    *
    *   "username": "u",
    *	"password": "p",
    *	"name": "john",
    *	"age": 21
    *}
    *response
    *{
    *    "status": "OK",
    *    "data": {
    *        "id": "5af0565afc73d10014328163"
    *    }
    *}
    *on trying to repeat the same register, then it should fail
    *{
    *    "status": "KO",
    *    "error": "user with username \"u\" already exists"
    *}
    * @param {object} formData - the body object.
    * @return {object} - this object contains the status and some credentials of the user.
    */
    register(formData) {
        return fetch(`${this.url}/api/user`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(formData) })
            .then(data => data.json())
            .then(data => data)
    },
    /**
     * This function receives a username and password, and returns status, Id and token on succes or status, and error on failure.
     * @example
     * body
     *{
     *	"username": "u",
     *	"password": "p"
     *}
     *response
    *{
     *   "status": "OK",
     *   "data": {
     *       "id": "5af0565afc73d10014328163",
     *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjA1NjVhZmM3M2QxMDAxNDMyODE2MyIsImlhdCI6MTUyNTcwMDcxOSwiZXhwIjoxNTI1NzA0MzE5fQ.WGIkcb0IWZnVybygtcStAzoWKkVPPAy7IZBxN3KUXbw"
     *   }
     *} 
     * on trying to login with wrong username
     *{
     *   "status": "KO",
     *   "error": "user with username \"u2\" does not exist"
     *}
     * 
     * @param {object} formData - the body object
     * @return {object} - this object contains the status and some credentials of the user.
     */
    login(formData) {
        return fetch(`${this.url}/api/auth`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(formData) })
            .then(data => data.json())
            .then(data => data)

    },

    /**
    * This function receives Authorization: Bearer <token>, and returns status and data (Id, username, any another field) on succes or status and error on failure.
    * @example
    *response
    *on success
    *{
    *    "status": "OK",
    *   "data": {
    *       "id": "5af0565afc73d10014328163",
    *       "username": "u",
    *       "name": "john",
    *       "age": 21
    *   }
    * }
    * on failure
    *{
    *   "status": "KO",
    *   "error": "token id \"5af0565afc73d10014328163\" does not match user \"5af0565afc73d10014328162\""
    *}
    * 
    * @param {object} formData - the body object
    * @return {object} - this object contains the status and some credentials of the user.
    */

    retrieve() {
        return fetch(`${this.url}/api/user/${this.id}`, { headers: { 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' } })
            .then(data => data.json())
            .then(data => data)

    },
    /**
     * This function receives username, password, [, newUsername: string] // in case to update username, [, newPassword: string] // in case to update password,
     * [, anyOtherField: any-primitive], and [, anyOtherField: null] // in case to update deleting a field. 
     * Returns status on succes or status and error on failure.
     * @example
     * 
     * body
     *{
     *   "username": "u",
     *   "password": "p",
     *   "name": "jack",
     *    "age": 23
     *}
     *response
     *{
     *    "status": "OK"
     *}
     *on wrong request id
     *{
     *   "status": "KO",
     *    "error": "token id \"5af0565afc73d10014328163\" does not match user \"5af0565afc73d10014328162\""
     *}
     * @param {string} formData-Authorization: Bearer <token>
     * @return {object} - this object contains the status and an error on faliure case.
     */

    update(formData) {
        return fetch(`${this.url}/api/user/${this.id}`, { headers: { 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' }, method: 'PUT', body: JSON.stringify(formData) })
            .then(data => data.json())
            .then(data => data)

    },
    /**
     * This function receives username and password, and returns status on succes or status and error on failure.
     * @example
     * body
     *{
     *   "username": "u",
     *   "password": "p"
     *}
     *response
     *{
     *   "status": "OK"
     *}
     *on wrong request id
     *{
     *   "status": "KO",
     *    "error": "token id \"5af0565afc73d10014328163\" does not match user \"5af0565afc73d10014328162\""
     *}
     * @param {object} formData - the body object
     * @return {object} - this object contains the status and an error on faliure case.
     */
    unregister(formData) {
        return fetch(`${this.url}/api/user/${this.id}`, { headers: { 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' }, method: 'DELETE', body: JSON.stringify(formData) })
            .then(data => data.json())
            .then(data => data)

    }

}

export default logic