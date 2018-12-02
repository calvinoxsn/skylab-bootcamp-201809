const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')


const Chat = new Schema({

    userId: {
        type: ObjectId,
        ref: 'User'
    },
    user2Id: {
        type: ObjectId,
        ref: 'User'
    },  
    messages: [{

        text: {
            type: String
        },
        user: {
            type: ObjectId,
            ref: 'User'
        },
        username:{
            type: String,
            required: true
        },
        imgProfileUrl: {
            type: String
        }
    }]

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
    connection: {
        type: String,
        required: true,
        default: 'offline'
    },
    followers: [{
        type: ObjectId,
        ref: 'User'
    }],
    follows: [{
        type: ObjectId,
        ref: 'User'
    }],
    chats: [{
        type: ObjectId,
        ref: 'Chat'
    }]
          
    
})


const Comment = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    text: {
        type: String
    },
    username:{
        type: String,
        required: true
    },
    imgProfileUrl: {
        type: String
    }

})



const Vinyl = new Schema({

    id: {
        type: ObjectId,
        ref: 'User'
    },
    
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

    imgVinylUrl: {
        type: String,
    },

    info: {
        type: String,
    },

    comments: [Comment],

    likes: [{
        type: ObjectId,
        ref: 'User'
    }]
   

})





module.exports = {   
    User,
    Chat,
    Comment,
    Vinyl
    
}


