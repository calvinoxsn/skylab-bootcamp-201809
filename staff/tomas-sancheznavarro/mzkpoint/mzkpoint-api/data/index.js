const mongoose = require('mongoose')

const { Product, User, Order } = require('./schemas')

module.exports = {
    Product: mongoose.model('Product', Product),
    User: mongoose.model('User', User),
    Order: mongoose.model('Order', Order)
}