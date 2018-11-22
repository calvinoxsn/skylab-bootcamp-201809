const mongoose = require('mongoose')

const { Product, User } = require('./schemas')

module.exports = {
    Product: mongoose.model('Product', Product),
    User: mongoose.model('User', User)
}