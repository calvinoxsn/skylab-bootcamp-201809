//const { User, Postit } = require('../data')
const { User } = require('../data')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')

const logic = {
    registerUser(email, username, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!email.trim()) throw new ValueError('email is empty or blank')
        if (!username.trim()) throw new ValueError('username is empty or blank')
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
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return (async () => {
            const user = await User.findOne({ username })

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.id
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

                //delete user._id
                delete user.__v
                delete user.password

            })

            return _users

        })()
    },

    // retrieveUserFollows(id) {

    //     if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

    //     if (!id.trim().length) throw new ValueError('id is empty or blank')
        
    //     return (async () => {
    //         const users = await User.find().lean()

    //         if (!users) throw new NotFoundError(`users not found`)

    //         const _users = users.filter( _index => _index._id != id )

    //         _users.forEach(user => {

    //             //delete user._id
    //             delete user.__v
    //             delete user.password

    //         })

    //         return _users

    //     })()
    // },

    retrieveUser(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {
            const user = await User.findById(id, { '_id': 0, password: 0, __v: 0 }).lean()

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            user.id = id

            return user
        })()
    },

    updateUser(id,  username, newPassword, password, imgProfileUrl, bio) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (username != null && typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (newPassword != null && typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (imgProfileUrl != null && typeof imgProfileUrl !== 'string') throw TypeError(`${imgProfileUrl} is not a string`)
        if (bio != null && typeof bio !== 'string') throw TypeError(`${bio} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')
        if (username != null && !username.trim().length) throw new ValueError('username is empty or blank')
        if (newPassword != null && !newPassword.trim().length) throw new ValueError('newPassword is empty or blank')
        if (!password.trim().length) throw new ValueError('password is empty or blank')
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
 
        
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
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

            user.follows.push(follow._id)
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
 
        
        // if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        // if (id != null && typeof id !== 'string') throw TypeError(`${id} is not a string`)

        // if (!id.trim().length) throw new ValueError('id is empty or blank')
        // if (followUsername != null && !followUsername.trim().length) throw new ValueError('followUsername is empty or blank')

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const follows = user.follows
            
            return follows


        })()

    },

    // /**
    //  * Adds a postit
    //  * 
    //  * @param {string} id The user id
    //  * @param {string} text The postit text
    //  * 
    //  * @throws {TypeError} On non-string user id, or non-string postit text
    //  * @throws {Error} On empty or blank user id or postit text
    //  * 
    //  * @returns {Promise} Resolves on correct data, rejects on wrong user id
    //  */
    // addPostit(id, text, status) {
    //     if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

    //     if (!id.trim().length) throw new ValueError('id is empty or blank')

    //     if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

    //     if (!text.trim().length) throw new ValueError('text is empty or blank')

    //     return (async () => {
    //         const user = await User.findById(id)

    //         if (!user) throw new NotFoundError(`user with id ${id} not found`)

    //         const postit = new Postit({ text, user: user.id, status })

    //         await postit.save()
    //     })()
    // },

    // listPostits(id) {
    //     if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

    //     if (!id.trim().length) throw new ValueError('id is empty or blank')

    //     return (async () => {
    //         const user = await User.findById(id).lean()

    //         if (!user) throw new NotFoundError(`user with id ${id} not found`)

    //         const postits = await Postit.find({ user: user._id })
    //             .lean()

    //         postits.forEach(postit => {
    //             postit.id = postit._id.toString()

    //             delete postit._id

    //             postit.user = postit.user.toString()

    //             return postit
    //         })

    //         return postits
    //     })()
    // },

    // /**
    //  * Removes a postit
    //  * 
    //  * @param {string} id The user id
    //  * @param {string} postitId The postit id
    //  * 
    //  * @throws {TypeError} On non-string user id, or non-string postit id
    //  * @throws {Error} On empty or blank user id or postit text
    //  * 
    //  * @returns {Promise} Resolves on correct data, rejects on wrong user id, or postit id
    //  */
    // removePostit(id, postitId) {
    //     if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

    //     if (!id.trim().length) throw new ValueError('id is empty or blank')

    //     if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

    //     if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

    //     return (async () => {
    //         const user = await User.findById(id)

    //         if (!user) throw new NotFoundError(`user with id ${id} not found`)

    //         const postit = await Postit.findOne({ user: user._id, _id: postitId })

    //         if (!postit) throw new NotFoundError(`postit with id ${postitId} not found`)

    //         await postit.remove()
    //     })()
    // },

    // modifyPostit(id, postitId, text, status) {
    //     if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

    //     if (!id.trim().length) throw new ValueError('id is empty or blank')

    //     if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

    //     if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

    //     if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

    //     if (!text.trim().length) throw new ValueError('text is empty or blank')

    //     return (async () => {
    //         const user = await User.findById(id)

    //         if (!user) throw new NotFoundError(`user with id ${id} not found`)

    //         const postit = await Postit.findOne({ user: user._id, _id: postitId })

    //         if (!postit) throw new NotFoundError(`postit with id ${postitId} not found`)

    //         postit.text = text
    //         postit.status = status

    //         await postit.save()
    //     })()
    // }
}

module.exports = logic