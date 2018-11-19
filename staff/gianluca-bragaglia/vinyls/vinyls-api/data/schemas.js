const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Comment = new Schema({
        user: {
            type: ObjectId,
            ref: 'User'
        },
        text: {
            type: String
        }
    })


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
        type: String
    },

    comments: [Comment],

    likes: {
        type: ObjectId,
        ref: 'User'
    },

    imageVinylUrl: {
        type: String

    },

    user: {
        type: ObjectId,
        ref: 'User'
    }

})

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

module.exports = {
    Vinyl,
    User,
    Comment
}


//module.exports = { User }

