
const { models: { User, Comment, Vinyl } } = require('vinyls-data')
const fs = require('fs')
const path = require('path')
const { env: { PORT } } = process

const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')

const logic = {
    registerUser(email, username, password) {

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim()) throw new ValueError('email is empty or blank')

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim()) throw new ValueError('username is empty or blank')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)  
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return (async () => {
            let user = await User.findOne({ username })

            if (user) throw new AlreadyExistsError(`username ${username} already registered`)

            user = new User({email, username, password })

            await user.save()
        })()
    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim()) throw new ValueError('username is empty or blank')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)      
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return (async () => {
            const user = await User.findOne({ username })

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.id
        })()
    },


    retrieveUser(id) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {
            const user = await User.findById(id, { '_id': 0, password: 0, __v: 0 }).lean()

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            user.idUser = id

            return user
        })()
    },


    retrieveUsers(id) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {
            const users = await User.find().lean()

            if (!users) throw new NotFoundError(`users not found`)

            const _users = users.filter( _index => _index._id != id )

            _users.forEach(user => {

                user.idUser = user._id
                delete user._id
                delete user.__v
                delete user.password

                return user

            })

            return _users

        })()
    },

    retrieveUsersAll() {
      
        return (async () => {
            const users = await User.find().lean()

            if (!users) throw new NotFoundError(`users not found`)


            users.forEach(user => {

                user.idUser = user._id
                delete user._id
                delete user.__v
                delete user.password

                return user

            })

            return users

        })()
    },

    updateUser(id, username, password, newPassword, imgProfileUrl, bio) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (username != null && typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (username != null && !username.trim().length) throw new ValueError('username is empty or blank')

        if (newPassword != null && typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (newPassword != null && !newPassword.trim().length) throw new ValueError('newPassword is empty or blank')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new ValueError('password is empty or blank')

        if (imgProfileUrl != null && typeof imgProfileUrl !== 'string') throw TypeError(`${imgProfileUrl} is not a string`)

        if (bio != null && typeof bio !== 'string') throw TypeError(`${bio} is not a string`)
        if (bio != null && !bio.trim().length) throw new ValueError('biography is empty or blank')

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (user.password !== password) throw new AuthError('invalid password')

            if (username) {
                const _user = await User.findOne({ username })

                if (_user && _user.username != user.username) throw new AlreadyExistsError(`username ${username} already exists`)
  
                user.username = username
                newPassword != null && (user.password = newPassword)
                user.imgProfileUrl = imgProfileUrl
                user.bio = bio
               
                await user.save()
            } else {
    
                newPassword != null && (user.password = newPassword)

                await user.save()
            }
        })()
    },

    addFollow(id, followUsername) {
    
        if (id != null && typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (followUsername != null && !followUsername.trim().length) throw new ValueError('followUsername is empty or blank')

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const follow = await User.findOne({ username: followUsername })

            if (!follow) throw new NotFoundError(`user with username ${followUsername} not found`)

            if (user.id === follow.id) throw new NotAllowedError('user cannot follow himself')
            
            user.follows.forEach(_followId => {
                
                if (_followId == follow.id) throw new AlreadyExistsError(`already follow this user`)
            })

            follow.followers.forEach(_followersId => {
                
                if (_followersId == id) throw new AlreadyExistsError(`already follow this user`)
            })

            user.follows.push(follow.id)
            follow.followers.push(id)

            await user.save()
            await follow.save()

        })()

    },

    removeFollow(id, followUsername) {
    
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (id != null && typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')
        if (followUsername != null && !followUsername.trim().length) throw new ValueError('followUsername is empty or blank')

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const follow = await User.findOne({ username: followUsername })

            if (!follow) throw new NotFoundError(`user with username ${followUsername} not found`)

            const index = user.follows.findIndex(_index => {
                return _index == follow.id
            })

            const index2 = follow.follows.findIndex(_index => {
                return _index == id
            })

            user.follows.splice(index,1)
            follow.followers.splice(index2,1)

            await user.save()
            await follow.save()
        })()

    },

    retrieveFollows(id) {
 
        if (id != null && typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')
  
        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const follows = user.follows
            
            return follows
            
        })()

    },

    retrieveListFollows(id) {
    
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (id != null && typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')


        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const follows = user.follows
            
            const users = await User.find().lean()

            if (!users) throw new NotFoundError(`users not found`)

            const _users = users.filter( _index => _index._id != id )

            const listFollows = _users.filter(function(el){ 
                return ~follows.indexOf(el._id)
            })

            listFollows.forEach(user => {

                user.idUser = user._id
                delete user._id
                delete user.__v
                delete user.password

                return user
            })
            
            return listFollows



        })()

    },

    retrieveListFollowers(id) {
       
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (id != null && typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')


        return (async () => {

            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const followers = user.followers
            
            const users = await User.find().lean()

            if (!users) throw new NotFoundError(`users not found`)

            const _users = users.filter( _index => _index._id != id )

            const listFollowers = _users.filter(function(el){ 
                return ~followers.indexOf(el._id)
            })

            listFollowers.forEach(user => {

                user.idUser = user._id
                delete user._id
                delete user.__v
                delete user.password

                return user
            })
            
            return listFollowers

        })()

    },

    /**
     * Adds a vinyl
     * @param {string} id The user id
     * @param {string} title The vinyl title
     * @param {string} artist The vinyl artist
     * @param {string} year The year of vinyl
     * @param {string} info The vinyl info
     * @param {string} imgVinylUrl The vinyl image url
     *
     * 
     * @throws {TypeError} On non-string user id, or non-string postit text
     * @throws {Error} On empty or blank user id or postit text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id
     */
    addVinyl(id, title, artist, year, imgVinylUrl, info ) {
  
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('user id is empty or blank')

        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new ValueError('title is empty or blank')        

        if (typeof artist !== 'string') throw TypeError(`${artist} is not a string`)
        if (!artist.trim().length) throw new ValueError('artist is empty or blank')

        if (year != null && typeof year !== 'number') throw TypeError(`${year} is not a number`)

        if (info != null && typeof info !== 'string') throw TypeError(`${info} is not a string`)
        if (!info.trim().length) throw new ValueError('info is empty or blank')

        if (imgVinylUrl != null && typeof imgVinylUrl !== 'string') throw TypeError(`${imgVinylUrl} is not a string`)

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const vinyl = new Vinyl({ id: user.id, title, artist, year, imgVinylUrl, info })

            await vinyl.save()
        })()
    },

    retrieveVinyls() {
      
        return (async () => {
            const vinyls = await Vinyl.find().lean()
           
            if (!vinyls) throw new NotFoundError(`vinyls not found`)

            vinyls.forEach(vinyl => {

                vinyl.idVinyl = vinyl._id

                delete vinyl._id
                delete vinyl.__v

                return vinyl

            })

            return vinyls

        })()
    },

    retrieveVinylById(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {

            const vinyl = await Vinyl.findById(id, { '_id': 0,  __v: 0 }).lean()

            if (!vinyl) throw new NotFoundError(`vinyl with id ${id} not found`)

            vinyl.idVinyl = vinyl._id

            delete vinyl._id
            delete vinyl.__v

            return vinyl

        })()
    },


    retrieveVinylsByUserId(id) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {

            const vinyls = await Vinyl.find({id: id}).lean()

            if (!vinyls) throw new NotFoundError(`vinyls with id ${id} not found`)

            vinyls.forEach(vinyl => {

                vinyl.idVinyl = vinyl._id

                delete vinyl._id
                delete vinyl.__v

                return vinyl

            })

            return vinyls

        })()
    },

    removeVinyl(id) {
        
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {
            const vinyl = await Vinyl.findById(id)

            if (!vinyl) throw new NotFoundError(`user with id ${id} not found`)

            await vinyl.remove()
        })()
    }

}

module.exports = logic