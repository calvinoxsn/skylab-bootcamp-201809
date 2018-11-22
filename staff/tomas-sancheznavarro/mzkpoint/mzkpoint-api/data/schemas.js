const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Product = new Schema({
    instrument: {
        type: String,
        required: true,
        enum: ['GUITAR', 'BASS', 'KEYBOARDS', 'DRUMS'],
    },

    brand: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    features: [{
        type: String,
        required: true
    }],

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
    },

    inStock: {
        type: Number,
        required: true,
        default: true
    },

    underWarranty: {
        type: Boolean,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true,
        enum: ['ELECTRIC', 'ACOUSTIC', 'ELECTROACOUSTIC', 'CLASSICAL']
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

    email: {
        type: String,
        required: true
    },
    
    wishlist: [{
        type: ObjectId,
        ref: 'Product'    
    }],

    shoppingCart: [{
        type: ObjectId,
        ref: 'Product'
    }]
})

module.exports = {
    Product,
    User
}

