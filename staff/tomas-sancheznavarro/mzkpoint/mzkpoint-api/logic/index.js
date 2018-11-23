const { User, Product } = require('../data')
const { AlreadyExistsError, AuthError, NotAllowedError, NotFoundError, ValueError } = require('../errors')
const validate = require('../utils/validate')
// const fs = require('fs')
// const path = require('path')

const logic = {
    registerUser(name, surname, username, email, password) {
        validate([{ key: 'name', value: name, type: String },
        { key: 'surname', value: surname, type: String },
        { key: 'username', value: username, type: String },
        { key: 'email', value: username, type: String },
        { key: 'password', value: password, type: String }])

        return (async () => {
            let user = await User.findOne({ username })

            if (user) throw new AlreadyExistsError(`username ${username} already registered`)

            user = new User({ name, surname, username, email, password })

            await user.save()
        })()
    },

    authenticateUser(username, password) {
        validate([{ key: 'username', value: username, type: String },
        { key: 'password', value: password, type: String }])

        return (async () => {
            const user = await User.findOne({ username })

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.id
        })()
    },

    retrieveUser(id) {
        validate([{ key: 'id', value: id, type: String }])

        return (async () => {
            const user = await User.findById(id, { '_id': 0 }).lean()

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            user.id = id

            return user
        })()
    },

    updateUser(id, name, surname, username, newPassword, password) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'name', value: name, type: String, optional: true },
            { key: 'surname', value: surname, type: String, optional: true },
            { key: 'username', value: username, type: String, optional: true },
            { key: 'password', value: password, type: String }

        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (user.password !== password) throw new AuthError('invalid password')

            if (username) {

                if (username !== user.username) {
                    const _user = await User.findOne({ username })

                    if (_user) throw new AlreadyExistsError(`username ${username} already exists`)
                }

                name != null && (user.name = name)
                surname != null && (user.surname = surname)
                user.username = username
                newPassword != null && (user.password = newPassword)

                await user.save()
            } else {
                name != null && (user.name = name)
                surname != null && (user.surname = surname)
                newPassword != null && (user.password = newPassword)

                await user.save()
            }
        })()
    },


    // QUERY PRODUCTS

    searchProducts(search) {

        validate([{ key: 'search', value: search, type: String }])


        return (async () => {

            if (!(search.trim().length)) throw new ValueError('You must enter at least one search term')

            const result = await Product.find(
                {
                    $or: [{ instrument: { $regex: search, $options: 'i' } },
                    { brand: { $regex: search, $options: 'i' } },
                    { features: { $regex: search, $options: 'i' } },
                    ]
                },
                (err, data) => {
                    if (err) return
                    return data
                }
            )
            if (!result.length) throw new NotFoundError('Nothing found')
            return result
        })()

    },

    filterProduct(instrument, type) {

        // validate([
        // { key: 'query', value: query, type: String }])


        return (async () => {

            // if (query === "/") throw new ValueError(`You must enter at least one search term`)

            const result = await Product.find(
                { $and: [{ instrument: { $regex: instrument, $options: 'i' } }, { type: { $regex: type, $options: 'i' } }] },
                function (err, data) {

                    if (err) return

                    return data
                }
            )
            if (!result.length) throw new NotFoundError('Nothing found')
            return result
        })()

    },

    // WISHLIST

    addItemToWishlist(userId, productId) {

        return (async () => {

            let user = await User.findById(userId)

            user.wishlist.push(productId)

            await user.save()

        })()
    },

    showWishlist(userId) {

        // validate([
        //     { key: 'id', value: id, type: String }
        // ])

        return (async () => {

            const user = await User.findById(userId).lean()

            debugger


            if (!user) throw new NotFoundError(`user with id number ${id} not found`)
            // const items = await Product.find().lean()
            const _items = user.wishlist

            const result = await Product.find({
                '_id': { $in: _items }
            }, function (err, items) {
                return items
            });

            return result

        })()
    },

    removeItemInWishlist(userId, productId) {
        // validate([
        //     { key: 'id', value: id, type: String },
        //     { key: 'postitId', value: postitId, type: String }
        // ])

        return (async () => {
            const user = await User.findById(userId)

            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            const wishlist = await Product.findById(productId)
            if (!wishlist) throw new NotFoundError(`product with id number ${productId} not found`)

            return User.updateOne({ _id : userId }, { $pull: { wishlist: productId } })
        })()
    },
}

module.exports = logic