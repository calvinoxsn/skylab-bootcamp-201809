const logic = {
    _userId: sessionStorage.getItem('userId') || null,
    _token: sessionStorage.getItem('token') || null,

    url: 'http://localhost:5000/api',

    registerUser(name, surname, username, email, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return fetch(`${this.url}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ name, surname, username, email, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

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

                const { id, token } = res.data

                this._userId = id
                this._token = token

                sessionStorage.setItem('userId', id)
                sessionStorage.setItem('token', token)
            })
    },

    get loggedIn() {
        return !!this._userId
    },

    logout() {
        this._userId = null
        this._token = null

        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('token')
    },

    ////// QUERIES //////

    searchProduct(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim()) throw Error('You must enter at least one custom search term')

        return fetch(`${this.url}/products/${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)
                return res
            })
    },

    filterProduct(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        return fetch(`${this.url}/products/custom/filter`, {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.error) throw Error(res.error)
                return res
            })
    },

    ////// WISHLIST //////

    addItemToWishlist(productId) {
        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)

        return fetch(`${this.url}/users/wishlist`, {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                'Authorization': `Bearer ${this._token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                return res
            })
    },

    showWishlist() {

        return fetch(`${this.url}/users/products/wishlist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                return res
            })

    },

    removeItemInWishlist(id) {
        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/users/wishlist/${id}`, {
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

    ////// SHOPPING CART //////

    addItemToCart(productId) {
        if (typeof productId !== 'string') throw new TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('product id is empty or blank')

        return fetch(`${this.url}/users/shopping-cart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this._token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                return res
            })
    },

    showCart() {
        // if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)
        // if (!userId.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/users/products/shopping-cart`, {
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

    removeItemInCart(userId, productId) {
        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)
        if (typeof productId !== 'string') throw new TypeError(`${productId} is not a string`)

        if (!userId.trim().length) throw Error('user id is empty or blank')
        if (!productId.trim().length) throw Error('product id is empty or blank')


        return fetch(`${this.url}/users/shopping-cart/${productId}`, {
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
}

export default logic
// module.exports = logic
