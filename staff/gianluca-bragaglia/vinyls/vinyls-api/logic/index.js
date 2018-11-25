
const { models: { User, Comment, Vinyl } } = require('vinyls-data')
const fs = require('fs')
const path = require('path')
const { env: { PORT } } = process
const validate = require('../utils/validate')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError, NotAllowedError } = require('../errors')

const logic = {
    registerUser(email, username, password) {

        validate([{ key: 'email', value: email, type: String }, { key: 'username', value: username, type: String }, { key: 'password', value: password, type: String }])

        return (async () => {
            let user = await User.findOne({ username })

            if (user) throw new AlreadyExistsError(`username ${username} already registered`)

            user = new User({email, username, password })

            await user.save()
        })()
    },

    authenticateUser(username, password) {

        validate([{ key: 'username', value: username, type: String }, { key: 'password', value: password, type: String }])

        return (async () => {
            const user = await User.findOne({ username })

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.id
        })()
    },


    retrieveUser(id) {

        validate([{ key: 'id', value: id, type: String }])

        return (async () => {
            const user = await User.findById(id, { '_id': 0, password: 0, __v: 0 }).lean()

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            user.idUser = id

            return user
        })()
    },


    retrieveGalleryUsers(id) {

        validate([{ key: 'id', value: id, type: String }])

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

            const galleryusers = _users.sort(function() {return 0.5 - Math.random()}).slice(0, 8)

            return galleryusers

        })()
    },

    retrieveUsers() {
      
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

        validate([
            { key: 'id', value: id, type: String },
            { key: 'username', value: username, type: String },
            { key: 'password', value: password, type: String },
            { key: 'newPassword', value: password, type: String, optional: true },
            { key: 'imgProfileUrl', value: password, type: String, optional: true }           
        ])

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
                user.bio = bio || ''
               
                await user.save()
            } else {
    
                newPassword != null && (user.password = newPassword)

                await user.save()
            }
        })()
    },

    searchUsers(query) {

        validate([{ key: 'query', value: query, type: String, optional: true  }])

        
        return (async () => {
            
            if (!(query.trim().length)) throw new ValueError('You must enter at least one search term')

            const users = await User.find({ username: { $regex: query, $options: 'i' } }).lean()

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

    addFollow(id, followUsername) {

        validate([{ key: 'id', value: id, type: String }])

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

        validate([{ key: 'id', value: id, type: String }, { key: 'followUsername', value: followUsername, type: String }])
    
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

    isFollows(id) {

        validate([{ key: 'id', value: id, type: String }])
 
        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const follows = user.follows
            
            return follows
            
        })()

    },

    retrieveListFollows(id) {

        validate([{ key: 'id', value: id, type: String }])


        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const follows = user.follows

            const listFollows = await User.find({
                '_id': { $in: follows}
            }, function(err, docs){
                return docs
            }).lean()

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

        validate([{ key: 'id', value: id, type: String }])

        if (!id.trim().length) throw new ValueError('id is empty or blank')


        return (async () => {

            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const followers = user.followers

            const listFollowers = await User.find({
                '_id': { $in: followers}
            }, function(err, docs){
                return docs
            }).lean()

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

        validate([
            { key: 'id', value: id, type: String },
            { key: 'title', value: title, type: String },
            { key: 'artist', value: artist, type: String },
            { key: 'year', value: year, type: Number },
            { key: 'imgVinylUrl', value: imgVinylUrl, type: String, optional: true }           
        ])
  

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const vinyl = new Vinyl({ id: user.id, title, artist, year, imgVinylUrl, info  })

            vinyl.info = info || ''

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

        validate([{ key: 'id', value: id, type: String }])

        return (async () => {

            const vinyl = await Vinyl.findById(id, { '_id': 0,  __v: 0 }).lean()

            if (!vinyl) throw new NotFoundError(`vinyl with id ${id} not found`)

            const comments = vinyl.comments

            comments.forEach(comment => {

                comment.idComment = comment._id

                delete comment._id
                delete comment.__v

                return comment

            })

            vinyl.idVinyl = vinyl._id

            delete vinyl._id
            delete vinyl.__v

            return vinyl

        })()
    },


    retrieveVinylsByUserId(id) {

        validate([{ key: 'id', value: id, type: String }])

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

    searchVinyls(query) {

        validate([{ key: 'query', value: query, type: String, optional: true }])

        
        return (async () => {
            
            if (!(query.trim().length)) throw new ValueError('You must enter at least one search term')

            const vinyls = await Vinyl.find({ title: { $regex: query, $options: 'i' } }).lean()

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

        validate([{ key: 'id', value: id, type: String }])

        return (async () => {
            const vinyl = await Vinyl.findById(id)

            if (!vinyl) throw new NotFoundError(`user with id ${id} not found`)

            await vinyl.remove()
        })()
    },

    editVinyl(id, title, artist, year, imgVinylUrl, info ) {

        validate([
            { key: 'id', value: id, type: String },
            { key: 'title', value: title, type: String },
            { key: 'artist', value: artist, type: String },
            { key: 'year', value: year, type: Number },
            { key: 'imgVinylUrl', value: imgVinylUrl, type: String, optional: true }           
        ])
  
        return (async () => {

            const vinyl = await Vinyl.findById(id)

            if (!vinyl) throw new NotFoundError(`vinyl with id ${id} not found`)

            vinyl.title = title
            vinyl.artist = artist
            vinyl.year = year
            vinyl.imgVinylUrl = imgVinylUrl
            vinyl.info = info || ''
        
            await vinyl.save()
        })()
    },

    addLikeToVinyl(id, userId) {

        validate([{ key: 'id', value: id, type: String }])
        validate([{ key: 'userId', value: userId, type: String }])

        return (async () => {

            const vinyl = await Vinyl.findById(id)

            if (!vinyl) throw new NotFoundError(`vinyl with id ${id} not found`)

            if (!userId) throw new NotFoundError(`user with id ${userId} not found`)
            
            vinyl.likes.forEach(_id => {
                
                if (_id == userId) throw new AlreadyExistsError(`already likes this vinyl`)
            })

            vinyl.likes.push(userId)

            await vinyl.save()

        })()

    },


    removeLikeToVinyl(id, userId) {

        validate([{ key: 'id', value: id, type: String }])
        validate([{ key: 'userId', value: userId, type: String }])

        return (async () => {

            const vinyl = await Vinyl.findById(id)

            if (!vinyl) throw new NotFoundError(`vinyl with id ${id} not found`)

            if (!userId) throw new NotFoundError(`user with id ${userId} not found`)

            let _likes = vinyl.likes

            const __likes = _likes.filter(el => {
                return el != userId
                })
                
            vinyl.likes = __likes

            await vinyl.save()

        })()

    },

    isLikes(id) {

        validate([{ key: 'id', value: id, type: String }])
 
        return (async () => {
            const vinyl = await Vinyl.findById(id)

            if (!vinyl) throw new NotFoundError(`vinyl with id ${id} not found`)

            const likes = vinyl.likes

            // const isLike = 'FALSE'

            // if(likes.includes(userId) )

            // isLike = 'TRUE'
            
            // return isLike

            return likes
            
        })()

    },

    addCommentToVinyl(vinylId, userId, text) {

        validate([
            { key: 'vinylId', value: vinylId, type: String },
            { key: 'text', value: text, type: String },
            { key: 'userId', value: userId, type: String }         
        ])
  

        return (async () => {
            const user = await User.findById(userId).lean()

            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            const username = user.username
            const imgProfileUrl = user.imgProfileUrl

            const comment = new Comment({ id: user.id, text, username, imgProfileUrl })

            const vinyl = await Vinyl.findById(vinylId)

            vinyl.comments.push(comment)

            await vinyl.save()
        })()
    },

    retrieveVinylComments(id) {

        validate([{ key: 'id', value: id, type: String }])

        return (async () => {

            const vinyl = await Vinyl.findById(id, { '_id': 0,  __v: 0 }).lean()

            if (!vinyl) throw new NotFoundError(`vinyl with id ${id} not found`)

            const comments = vinyl.comments

            comments.forEach(comment => {

                comment.idComment = comment._id

                delete comment._id
                delete comment.__v

                return comment

            })

            return comments

        })()

    },

}

module.exports = logic