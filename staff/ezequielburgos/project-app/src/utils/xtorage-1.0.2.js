// 'use strict'

/**
 * Common interface for session and local storage
 * 
 * Provides accessors for storing and retrieving JSON-compliance type item (value)
 * 
 * @example
 * 
 * //session storage
 * 
 * Xtorage.session.set('user', {name: 'John', surname: 'Doe'})
 * 
 * const user = Xtorage.session.get('user')
 * 
 * console.log(user.name, user.surname) // -> "John" "Doe"
 * 
 * // local storage
 * 
 * Xtorage.local.set('user')
 * 
 * console.log(user.id) // -> "abc123"
 * 
 * @author manuelbarzi
 * @version 1.0.1
 */
// class Xtorage{}

var Xtorage = class {
	/**
	 * Creates an instance
	 * 
	 * @param {Storage} storage - An instance of Storage class (e.g. sesison or local storage in browser)
	 */
	constructor(storage) {
		if (!(storage instanceof Storage)) throw TypeError('provided storage is not an instance of Storage')

		this.storage = storage
	}

	/**
	 * Stores a value in storage
	 * 
	 * @param {string} key - Identifies the value in storage
	 * @param {any} value - The value to be stored
	 */
	set(key, value) {
		this.storage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
	}

	/**
	 * Retrieves a value from storage
	 * 
	 * @param {string} key - The identifier of the value in storage
	 * 
	 * @returns {any} - The stored value
	 */
	get(key){
		const value = this.storage.getItem(key)

		try {
			return JSON.parse(value)
		}catch(e){
			return value === 'undefined' ? undefined : value
		}
	}

	/**
	 * Removes a value from storage
	 * 
	 * @param {string} key - The identifier of the value in storage
	 */
	remove(key){this.storage.removeItem(key)}

	/**
	 * Clears all values from storage
	 */
	clear(){ this.storage.clear()}

	/**
	 * Returns the number of items stored
	 */
	get length() {return this.storage.length}

	/**
	 * Session storage singleton
	 */
	// static session = new Xtorage(sessionStorage) // babel
	static get session(){return this._session ? this._session : this._session = new Xtorage(sessionStorage)}

	/**
	 * Local storage singleton
	 */
	//static local = new Xtorage(localStorage) // babel
	static get local(){ return this._local ? this._local : this._local = new Xtorage(localStorage)} 

}

// export default Xtorage // babel
if (typeof module !== 'undefined') module.exports = Xtorage