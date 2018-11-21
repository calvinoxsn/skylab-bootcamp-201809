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

router.post('/users', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { email, username, password } = req.body

        return logic.registerUser(email, username, password)
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


router.get('/users/user/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {

        const { params: { id }, sub } = req
        

        return logic.retrieveUsers(id)
            .then(users =>
                res.json({
                    data: users
                })
            )
    }, res)
})

router.get('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        return logic.retrieveUser(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})


router.get('/users', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {

        return logic.retrieveUsers()
            .then(users =>
                res.json({
                    data: users
                })
            )
    }, res)
})

router.patch('/users/:id', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { username, newPassword, password, imgProfileUrl, bio } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.updateUser(id, username ? username : null, newPassword ? newPassword : null, password, imgProfileUrl ? imgProfileUrl : null, bio ? bio : null )
            .then(() =>
                res.json({
                    message: 'user updated'
                })
            )
    }, res)
})

router.patch('/users/:id/follows', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { followUsername } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.addFollow(id, followUsername)
            .then(() =>
                res.json({
                    message: 'follow added'
                })
            )
    }, res)
})

router.delete('/users/:id/follows', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { followUsername } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.removeFollow(id, followUsername)
            .then(() =>
                res.json({
                    message: 'follow removed'
                })
            )
    }, res)
})

router.get('/users/:id/follows', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveFollows(id)
            .then(follows => res.json({
                data: follows
            }))
            
    }, res)
})

router.get('/users/:id/followsList', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveListFollows(id)
            .then(listFollows => res.json({

                data: listFollows
            }))
            
    }, res)
})

router.get('/users/:id/followersList', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveListFollowers(id)
            .then(listFollowers => res.json({

                data: listFollowers
            }))
            
    }, res)
})


router.post('/vinyls', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {

        const  { id, title, artist, year, imgVinylUrl, info }  = req.body

        return logic.addVinyl( id, title, artist, year, imgVinylUrl, info )
            .then(() => res.json({
                message: 'vinyl added'
            }))

    }, res)
})

router.get('/vinyls', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {

        return logic.retrieveVinyls()
            .then(vinyls => res.json({
                data: vinyls
            }))

    }, res)
})

router.get('/vinyls/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        
        const { params: { id } } = req

        return logic.retrieveVinylById(id)
            .then(vinyl => res.json({
                data: vinyl
            }))
    }, res)
})

router.get('/vinyls/user/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        
        const { params: { id } } = req

        return logic.retrieveVinylsByUserId(id)
            .then(vinyl => res.json({
                data: vinyl
            }))
    }, res)
})

router.delete('/vinyls/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        
        const { params: { id } } = req

        return logic.removeVinyl(id)
            .then(() => res.json({
                message: 'vinyl removed'
            }))
    }, res)
})



module.exports = router