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

    keyFeatures: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: Array,
            required: true
        }
    },

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
    wishlist: [{
        type: ObjectId,
        ref: 'Product'
    }]
})

module.exports = {
    Product,
    User
}

