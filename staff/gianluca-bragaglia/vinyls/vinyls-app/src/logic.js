// json-server --watch vinyls.json --port 5500



const logic = {

    _userId: sessionStorage.getItem('userId') || null,
    _token: sessionStorage.getItem('token') || null,

    url: 'http://localhost:5000/api',

     /**
     * 
     * @param {string} surname Given email of user
     * @param {string} username Given username of user
     * @param {string} password Given password of user
     * 
     * @throws {Error in case of empty parameters}
     * @throws {Error in case API detects repeated username} 
     * 
     *@returns {Promise}
     */

    registerUser(email, username, password) {

        if (!email.trim()) throw Error('email is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')
       
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (email.match(/^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) throw Error(`${email} is an invalid email`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        
        

        return fetch(`${this.url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ email, username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    /**
     * 
     * 
     * @param {string} username Given username of user
     * @param {string} password Given password of user
     * 
     * @throws {Error in case of empty parameters}
     * @throws {Error in case API detects wrong credentials} 
     * 
     * @returns {Promise}
     * 
     * {Sets userId and Token to SessionStorage and to logic state if correct credentials}
     */

    login(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return fetch(`${this.url}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                const { id, token, username } = res.data

                this._userId = id
                this._token = token
                this._username = username

                sessionStorage.setItem('userId', id)
                sessionStorage.setItem('token', token)
            })
    },

    /**
     * 
     * Remove from session storage (user id and token)
     *
     */
    logout() {
        
        this._userId = null
        this._token = null

        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('token')
    },

     /**
     * 
     * @returns {boolean} If the user is logged in or not
     *
     */
    get loggedIn() {

        return !!this._userId
    },

    // getVinyls() {
    //     const res = axios.get('http://localhost:5500/vinyls')
       
    //     return res
    // },

    getUsers() {

        return fetch(`${this.url}/users/`, {headers: { 'Authorization': `Bearer ${this._token}` }})
            .then(res => res.json())
            .then(res => {
                
                if (res.error) throw Error(res.error)
                return res.data
            })
    },



    /**
     * 
     * 
     * @param {string} userId  unique id of the user 
     * 
     * 
     * @throws {Error in case user Id is not a string}
     * 
     * 
     * @returns {string} string of the username given the userId
     * 
     * 
     */
    getCurrentUser() {
        let id = this._userId

        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/users/${this._userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                
                if (res.error) throw Error(res.error)
                return res.data
                
            })
    },

    retrieveUserById(id) {

        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                
                if (res.error) throw Error(res.error)
                return res.data
                
            })
    },


    modifyUser(username, newPassword, password, imgProfileUrl, bio,) {

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (typeof bio !== 'string') throw TypeError(`${bio} is not a string`)


        return fetch(`${this.url}/users/${this._userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({username, newPassword, password, bio, imgProfileUrl })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    addFollow(followUsername) {

        
        if (typeof followUsername !== 'string') throw TypeError(`${followUsername} is not a string`)

        if (!followUsername.trim()) throw Error('followUsername is empty or blank')

        return fetch(`${this.url}/users/${this._userId}/follows`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ followUsername })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },


    removeFollow(followUsername) {

        
        if (typeof followUsername !== 'string') throw TypeError(`${followUsername} is not a string`)

        if (!followUsername.trim()) throw Error('followUsername is empty or blank')

        return fetch(`${this.url}/users/${this._userId}/follows`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ followUsername })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    retrieveFollows(id) {
        // if (typeof id !== 'string') throw Error(`${id} is not a string`)
        // if (typeof id === 'number') throw Error(`${id} is not a string`)
        // if (id instanceof Array) throw Error(` is not a string`)
        // if (typeof id === 'boolean') throw Error(`${id} is not a string`)
        // if (typeof id === 'object') throw Error(`[object Object] is not a string`)
        return fetch(`${this.url}/users/${this._userId}/follows`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                console.log(res.data);
                
                const follows = res.data
                follows.map(follow => {
                    if(follow.id == id) {
                        return true
                    }else{
                        return false
                    }
                })   
                
            })

    },


    
    
}

export default logic
//module.exports = logic