const mongoose = require('mongoose')

const { Products, User } = require('./schemas')

module.exports = {
    Products: mongoose.model('Postit', Postit),
    User: mongoose.model('User', User)
}