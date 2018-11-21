const mongoose = require('mongoose')

const { Vinyl, User, Comment } = require('./schemas')

//const { User } = require('./schemas')

module.exports = {
    Vinyl: mongoose.model('Vinyl', Vinyl),
    User: mongoose.model('User', User),
    Comment: mongoose.model('Comment', Comment)
}

// module.exports = {
//     User: mongoose.model('User', User)
// }