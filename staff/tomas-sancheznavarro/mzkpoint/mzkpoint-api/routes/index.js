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

// router.post('/products/find', [jsonBodyParser], (req, res) => {

//     routeHandler(() => {
//         const { sub, body: { customSearch} } = req

//         return logic.searchProduct(customSearch)
//             .then(product =>
//                 res.json({
//                     data: product
//                 })
//             )
//     }, res)
// })

// SEARCH AND FILTER PRODUCTS 

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
        const { sub, body: { instrument, type } } = req

        return logic.filterProduct(instrument, type)
            .then(product =>
                res.json({
                    data: product
                })
            )
    }, res)
})

router.post('/users/:id/add-item-to-wishlist', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {

    routeHandler(() => {
        const { params: { id }, body: { productId } } = req

        if (id !== sub ) throw Error('token sub does not math user id')

        return logic.addProductToWishlist(id, productId)
            .then(() =>
                res.json({
                    message: "Item added to wishlist"
                })
            )
    }, res)
})

router.get('/users/:id/show-wishlist', [bearerTokenParser, jwtVerifier], (req, res) => {

    routeHandler(() => {
        const { sub, params: { id } } = req

        return logic.showWishlist(id)
            .then(wish =>
                res.json({
                    wish
                })
            )
    }, res)
})


module.exports = router