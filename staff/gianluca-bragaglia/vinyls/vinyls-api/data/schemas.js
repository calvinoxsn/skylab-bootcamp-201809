const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')


/* 
const Vinyl = new Schema({
    title: {
        type: String,
        required: true
    },

    artist: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },

    info: {
        type: String,
    },

    comments: {
        type: Array

    },

    likes: {
        type: Number
    },

    imageUrl: {
        type: String,
        url: 'https://via.placeholder.com/300.png'
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }

}) */

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
    imgProfileUrl: {
        type: String

    },
    bio: {
        type: String

    },
    followers: [{
        type: ObjectId,
        ref: 'User'
    }],
    follows: [{
        type: ObjectId,
        ref: 'User'
    }]
    

})

// module.exports = {
//     Postit,
//     User
// }


module.exports = { User }

