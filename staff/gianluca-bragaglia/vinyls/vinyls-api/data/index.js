const mongoose = require('mongoose')

// const { Postit, User } = require('./schemas')

const { User } = require('./schemas')

// module.exports = {
//     Postit: mongoose.model('Postit', Postit),
//     User: mongoose.model('User', User)
// }

module.exports = {
    User: mongoose.model('User', User)
}