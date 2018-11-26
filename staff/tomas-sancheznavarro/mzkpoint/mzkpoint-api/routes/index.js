const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const bearerTokenParser = require('../utils/bearer-token-parser')
const jwtVerifier = require('./jwt-verifier')
const routeHandler = require('./route-handler')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

const { env: { JWT_SECRET } } = process

// USER REGISTRATION AND AUTHENTICATION

router.post('/register', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { name, surname, username, email, password } = req.body

        return logic.registerUser(name, surname, username, email, password)
            .then(() => {
                res.status(201)

                res.json({
                    message: `${username} successfully registered`
                })
            })
    }, res)
})

router.post('/auth', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { username, password } = req.body

        return logic.authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({
                    data: {
                        id,
                        token
                    }
                })
            })
    }, res)
})

router.get('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveUser(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})

router.patch('/users/:id', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { name, surname, username, newPassword, password } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.updateUser(id, name ? name : null, surname ? surname : null, username ? username : null, newPassword ? newPassword : null, password)
            .then(() =>
                res.json({
                    message: 'user updated'
                })
            )
    }, res)
})

// SEARCHING AND FILTERING PRODUCTS 

router.get('/products/:search', [jsonBodyParser], (req, res) => {

    routeHandler(() => {
        const { sub, params: { search } } = req

        return logic.searchProducts(search)
            .then(product =>
                res.json({
                    data: product
                })
            )
    }, res)
})

router.post('/products/filter', [jsonBodyParser], (req, res) => {

    routeHandler(() => {
        const { body: { instrument, type } } = req

        return logic.filterProduct(instrument, type)
            .then(product =>
                res.json({
                    data: product
                })
            )
    }, res)
})

// WISHLIST

router.post('/users/wishlist', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {

    routeHandler(() => {

        const { sub, body: { productId } } = req

        if (!sub) throw Error('Please enter valid token')


        return logic.addItemToWishlist(sub, productId)
            .then(() =>
                res.json({
                    message: `Item ${productId} succesfully added to wishlist`
                })
            )
    }, res)
})

router.get('/users/products/wishlist', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {

    routeHandler(() => {
        const { sub } = req

        if (!sub) throw Error('Please enter a valid token!')

        return logic.showWishlist(sub)
            .then(wishlist =>
                res.json({ wishlist })
            )
    }, res)
})

router.delete('/users/wishlist/:productId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { productId } } = req

        if (!sub) throw Error('Invalid token')

        return logic.removeItemInWishlist(sub, productId)
            .then(() => res.json({
                message: 'Item succesfully removed from wishlist'
            }))
    }, res)
})

// SHOPPING CART

router.post('/users/shopping-cart', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {

    routeHandler(() => {

        const { sub, body: { productId } } = req

        if (!sub) throw Error('Invalid token!')


        return logic.addItemToCart(sub, productId)
            .then(() =>
                res.json({
                    message: `Item ${productId} succesfully added to shopping cart`
                })
            )
    }, res)
})

router.get('/users/products/shopping-cart', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {

    routeHandler(() => {
        const { sub } = req

        if (!sub) throw Error('Please enter a valid token!')

        return logic.showCart(sub)
            .then(shoppingCart =>
                res.json({ shoppingCart })
            )
    }, res)
})

router.delete('/users/shopping-cart/:productId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { productId } } = req

        if (!sub) throw Error('Invalid token')

        return logic.removeItemInCart(sub, productId)
            .then(() => res.json({
                message: 'Item succesfully removed from shopping cart'
            }))
    }, res)
})
module.exports = router