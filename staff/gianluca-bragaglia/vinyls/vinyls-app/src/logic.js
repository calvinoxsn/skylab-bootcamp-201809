
global.sessionStorage = require('sessionstorage')


const logic = {

    _userId: sessionStorage.getItem('userId') || null,
    _token: sessionStorage.getItem('token') || null,

    url: 'NO-URL',

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

    // uploadImgProfile(formData) {

    //     return fetch(`users/${this._userId}/profilePicture`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json; charset=utf-8',
    //             'Authorization': `Bearer ${this._token}`,
    //             formData
    //         }
            
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.error) throw Error(res.error)
    //         })
    // },

    uploadImgProfile(picture) {

        let data = new FormData()
 
        data.append('picture', picture)
 
        return fetch (`${this.url}/users/${this._userId}/profilePicture`, {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${this._token}`
            },
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                return res.data
            })
    },

    uploadImgVinyl(picture) {

        let data = new FormData()
 
        data.append('picture', picture)
 
        return fetch (`${this.url}/vinyls/images`, {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${this._token}`
            },
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                return res.data
            })
    },


    retrieveGalleryUsers() {

        return fetch(`${this.url}/users/user/${this._userId}`, {headers: { 'Authorization': `Bearer ${this._token}` } })
            .then(res => res.json())
            .then(res => {
                
                if (res.error) throw Error(res.error)

                const users = res.data

                return users
            })
    },

    retrieveUsers() {

        return fetch(`${this.url}/users`, {headers: { 'Authorization': `Bearer ${this._token}` } })
            .then(res => res.json())
            .then(res => {
                
                if (res.error) throw Error(res.error)
                const users = res.data

                return users
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
        if (!username.trim().length) throw Error('username is empty or blank')
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty or blank')
        if (typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (bio != null && typeof bio !== 'string') throw TypeError(`${bio} is not a string`)


        return fetch(`${this.url}/users/${this._userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({username, password, bio, newPassword, imgProfileUrl })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },


    searchUsers(query) {

        return fetch(`${this.url}/users/search/${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                const users = res.data

                return users
                                     
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
            method: 'DELETE',
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

    itsInFollows(id) {
       
        if (typeof id !== 'string') throw Error(`${id} is not a string`)
        if (typeof id === 'number') throw Error(`${id} is not a string`)
        if (id instanceof Array) throw Error(` is not a string`)
        if (typeof id === 'boolean') throw Error(`${id} is not a string`)
        if (typeof id === 'object') throw Error(`[object Object] is not a string`)

        return fetch(`${this.url}/users/${this._userId}/follows`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                const follows = res.data

                if(follows.includes(id) )
                
                return true             
                           
            })

    },

    retrieveFollowsListUser() {

        return fetch(`${this.url}/users/${this._userId}/followsList`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                const followsList = res.data
                
                return followsList
                                     
            })

    },

    retrieveFollowersListUser() {

        return fetch(`${this.url}/users/${this._userId}/followersList`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                const followersList = res.data
                
                return followersList
                                     
            })

    },

    searchListVinyls(query) {

        return fetch(`${this.url}/vinyls/search/${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                const vinyls = res.data

                return vinyls
                                     
            })

    },

    addVinyl(title, artist, year, imgVinylUrl, info) {
       
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw TypeError('title is empty or blank')        

        if (typeof artist !== 'string') throw TypeError(`${artist} is not a string`)
        if (!artist.trim().length) throw TypeError('artist is empty or blank')

        if (typeof year !== 'number') throw TypeError(`${year} is not a number`)
        if ( year == 0) throw TypeError(`year is not a number`)

        if (info != null && typeof info !== 'string') throw TypeError(`${info} is not a string`)

        if (imgVinylUrl != null && typeof imgVinylUrl !== 'string') throw TypeError(`${imgVinylUrl} is not a string`)

        const id = this._userId

        return fetch(`${this.url}/vinyls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ id, title, artist, year, imgVinylUrl, info })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    retrieveVinyls() {
   
        return fetch(`${this.url}/vinyls`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                return  res.data
                                     
            })

    },

    retrieveVinylById(id) {

        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/vinyls/${id}`, {
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

    retrieveVinylsByUserId(id) {
   
        return fetch(`${this.url}/vinyls/user/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                return res.data
                                     
            })

    },

    retrieveVinylsCurrentUser() {
   
        return fetch(`${this.url}/vinyls/user/${this._userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                return res.data
                                     
            })

    },

    deleteVinyl(id) {

        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/vinyls/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    modifyVinyl(id, title, artist, year, imgVinylUrl, info) {
        
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw TypeError('title is empty or blank')        

        if (typeof artist !== 'string') throw TypeError(`${artist} is not a string`)
        if (!artist.trim().length) throw TypeError('artist is empty or blank')

        if (typeof year !== 'number') throw TypeError(`${year} is not a number`)
        if ( year == 0) throw TypeError(`year is not a number`)

        if (info != null && typeof info !== 'string') throw TypeError(`${info} is not a string`)

        if (imgVinylUrl != null && typeof imgVinylUrl !== 'string') throw TypeError(`${imgVinylUrl} is not a string`)

        return fetch(`${this.url}/vinyls/${id}/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ id, title, artist, year, imgVinylUrl, info })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    addLike(id) {
       
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim()) throw Error('followUsername is empty or blank')

        const userId = this._userId

        return fetch(`${this.url}/vinyls/${id}/likes`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ userId })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    removeLike(id) {
       
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim()) throw Error('followUsername is empty or blank')

        const userId = this._userId
      
        return fetch(`${this.url}/vinyls/${id}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ userId })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    itsInLikes(id) {    
       
        if (typeof id !== 'string') throw Error(`${id} is not a string`)
        if (typeof id === 'number') throw Error(`${id} is not a string`)
        if (id instanceof Array) throw Error(` is not a string`)
        if (typeof id === 'boolean') throw Error(`${id} is not a string`)
        if (typeof id === 'object') throw Error(`[object Object] is not a string`)

        return fetch(`${this.url}/vinyls/${id}/likes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error) 

                const userId = this._userId

                const likes = res.data

                if(likes.includes(userId))

                return true
        
                // if(res.data == 'TRUE') 

                // return true
            })
    },

    addComment(id, text) {
       
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim()) throw Error('id is empty or blank')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim()) throw Error('text is empty or blank')

        const userId = this._userId

        return fetch(`${this.url}/vinyls/${id}/comments`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ userId, text })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    retrieveComments(id) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim()) throw Error('id is empty or blank')
   
        return fetch(`${this.url}/vinyls/${id}/comments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                return  res.data
                                     
            })

    }
   
    
}

//export default logic
module.exports = logic