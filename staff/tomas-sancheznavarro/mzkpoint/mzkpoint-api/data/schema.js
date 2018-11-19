const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Product = new Schema({
    type: {

    },

    inStock: {
        type: String,
        required: true,
        default: false
    }
})

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wishlist: [{
        type: ObjectId,
        ref: 'Product'
    }]
})

module.exports = {
    Product,
    User
}

