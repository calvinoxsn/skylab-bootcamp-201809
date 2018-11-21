const { mongoose, models: { User, Vinyl, Comment} } = require('vinyls-data')
const logic = require('./index')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')
const { expect } = require('chai')
// const fs = require('fs-extra')
// const path = require('path')
// const hasha = require('hasha')
// const text2png = require('text2png')
// const streamToArray = require('stream-to-array')

const MONGO_URL = 'mongodb://localhost:27017/vinyls-test'

// running test from CLI
// normal -> $ mocha ./logic/index.spec.js --timeout 10000
// mocha ./logic/index.spec.js debug
// debug -> $ mocha debug ./index.spec.js --timeout 10000

describe('logic', () => {
    before(() => mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }))

    beforeEach(() => Promise.all([User.deleteMany(), Vinyl.deleteMany()]))

    describe('user', () => {
        describe('register', () => {
            let email, username, password

            beforeEach(() => {
                email = `email-${Math.random()}@tio.com`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', async () => {
                await logic.registerUser(email, username, password)

                const _user = await User.findOne({username})

                expect(_user.id).to.be.a('string')
                expect(_user.email).to.equal(email)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)
            })

            it('should fail on undefined email', () => {
                expect(() => logic.registerUser(undefined, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on undefined username', () => {
                expect(() => logic.registerUser(email, undefined, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on undefined password', () => {
                expect(() => logic.registerUser(email, username, undefined)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty email', () => {
                expect(() => logic.registerUser('', username, password)).to.throw(ValueError, 'email is empty or blank')
            })

            it('should fail on empty username', () => {
                expect(() => logic.registerUser(email, '', password)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on empty password', () => {
                expect(() => logic.registerUser(email, username, '')).to.throw(ValueError, 'password is empty or blank')
            })

            it('should fail on blank email', () => {
                expect(() => logic.registerUser('   \t\n', username, password)).to.throw(ValueError, 'email is empty or blank')
            })

            it('should fail on blank username', () => {
                expect(() => logic.registerUser( email, '  \t\n', password)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on blank password', () => {
                expect(() => logic.registerUser(email, username, '   \t\n')).to.throw(ValueError, 'password is empty or blank')
            })

            // TODO other test cases
        })

        describe('authenticate', () => {
            let user

            beforeEach(async () => {
                email = `email-${Math.random()}@tio.com`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`

                user = await new User({ email, username, password }).save()
            })

            it('should succeed on correct data', async () => {
                const id = await logic.authenticateUser(username, password)

                const _user = await User.findOne({ username })

                expect(id).to.be.a('string')
                expect(id).to.equal(_user.id)
            })

            it('should fail on incorrect password', async () => {
                try {
                    await logic.authenticateUser(username, 'password')
                    expect(true).to.be.false
                } catch (err) {
                    expect(err).to.be.instanceof(AuthError)
                    expect(err.message).to.equal(`invalid username or password`)
                }
            })


            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on undefined password', () => {
                expect(() => logic.authenticateUser(user.username, undefined)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty username', () => {
                expect(() => logic.authenticateUser('', password)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on empty password', () => {
                expect(() => logic.authenticateUser(username, '')).to.throw(ValueError, 'password is empty or blank')
            })

            it('should fail on blank username', () => {
                expect(() => logic.authenticateUser('   \t\n', password)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on blank password', () => {
                expect(() => logic.authenticateUser(email, '   \t\n')).to.throw(ValueError, 'password is empty or blank')
            })


            // TODO other test cases
        })

        describe('retrieve user', () => {
            let user
            
            beforeEach(async () => {
                user = new User({ email: 'John@jon.com', username: 'jd', password: '123' })

                await user.save()
            })
            

            it('should succeed on correct data', async () => {
                
                const _user = await logic.retrieveUser(user.id)

                const { email, username, idUser } = _user

                expect(_user).not.to.be.instanceof(User)

                expect(idUser).to.exist
               
                expect(idUser).to.be.a('string')
                expect(idUser).to.equal(user.id)
                expect(_user.email).to.equal(email)
                expect(_user.username).to.equal(username)
            })

            it('should fail on undefined id', () => {
                expect(() => logic.retrieveUser(undefined)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty id', () => {
                expect(() => logic.retrieveUser('')).to.throw(ValueError, 'id is empty or blank')
            })

            it('should fail on blank id', () => {
                expect(() => logic.retrieveUser('   \t\n')).to.throw(ValueError, 'id is empty or blank')
            })

        })


        describe('retrieve gallery Users', () => {
            let user
            
            beforeEach(async () => {
                user = new User({ email: 'John@jon.com', username: 'jd', password: '123' })
                user2 = new User({ email: 'Joh2n@jon.com', username: 'jd2', password: '1232' })

                await user.save()
                await user2.save()
            })
            

            it('should succeed on valid id', async () => {
                const _users = await logic.retrieveGalleryUsers(user.id)

                expect(_users.length).to.equal(1)

            })

            it('should fail on undefined id', () => {
                expect(() => logic.retrieveGalleryUsers(undefined)).to.throw(TypeError, 'undefined is not a string')
                
            })

            it('should fail on empty id', () => {
                expect(() => logic.retrieveGalleryUsers('')).to.throw(ValueError, 'id is empty or blank')
            })

            it('should fail on blank id', () => {
                expect(() => logic.retrieveGalleryUsers('   \t\n')).to.throw(ValueError, 'id is empty or blank')
            })

        })

        describe('retrieve all users', () => {
            let user
            
            beforeEach(async () => {
                user = new User({ email: 'John@jon.com', username: 'jd', password: '123' })
                user2 = new User({ email: 'Joh2n@jon.com', username: 'jd2', password: '1232' })


                await user.save()
                await user2.save()
            })
            

            it('should succeed on correct data', async () => {
                const _users = await logic.retrieveUsers()

                expect(_users.length).to.equal(2)

            })


        })


        describe('update', () => {
            let user

            beforeEach(() => (user = new User({ email:'joe@joe.com', username: 'jd', password: '123', imgProfileUrl: null, bio: null, follows: [], followers: [], comments: [] })).save())

            it('should update on correct data and password', async () => {
                const {id, username, password, newPassword, imgProfileUrl, bio} = user

                const newUsername = `${username}-${Math.random()}`
                const newImgProfileUrl = `${imgProfileUrl}-${Math.random()}`
                const newBio = `${bio}-${Math.random()}`


                const res = await logic.updateUser(id, newUsername, password, newPassword, newImgProfileUrl, newBio)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.imgProfileUrl).to.equal(newImgProfileUrl)
                expect(_user.bio).to.equal(newBio)
                expect(_user.username).to.equal(newUsername)
                expect(_user.newPassword).to.equal(newPassword)
            })

            it('should update on correct id and password, change username (other fields null)', async () => {
                const { id, username, password, imgProfileUrl, bio } = user

                const newUsername = `${username}-${Math.random()}`

                const res = await logic.updateUser(id, newUsername, password, null, null, null)

                debugger

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.username).to.equal(newUsername)
                expect(_user.password).to.equal(password)
                expect(_user.imgProfileUrl).to.equal(imgProfileUrl)
                expect(_user.bio).to.equal(bio)
            })

            it('should update on correct id and username, change password (other fields null)', async () => {
                const { id, username, password, imgProfileUrl, bio } = user

                const newPassword = `${password}-${Math.random()}`

                const res = await logic.updateUser(id, username, password, newPassword, null, null)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(newPassword).to.be.a('string')
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(newPassword)
                expect(_user.imgProfileUrl).to.equal(imgProfileUrl)
                expect(_user.bio).to.equal(bio)
            })

            it('should update on correct id, username and password, adding profile photo (other fields null)', async () => {
                const { id, username, password, imgProfileUrl, bio  } = user

                const newImgProfileUrl = `${imgProfileUrl}-${Math.random()}`

                const res = await logic.updateUser(id, username, password, null, newImgProfileUrl, null)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(newImgProfileUrl).to.be.a('string')
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)
                expect(_user.imgProfileUrl).to.equal(newImgProfileUrl)
                expect(_user.bio).to.equal(bio)
            })

            it('should update on correct id, username and password, adding bio (other fields null)', async () => {
                const { id, username, password, imgProfileUrl, bio  } = user

                const newBio = `${bio}-${Math.random()}`

                const res = await logic.updateUser(id, username, password, null, null, newBio)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(newBio).to.be.a('string')
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)
                expect(_user.imgProfileUrl).to.equal(imgProfileUrl)
                expect(_user.bio).to.equal(newBio)
            })


            it('should update on correct id, username and password, adding bio and photo profile', async () => {
                const { id, username, password, imgProfileUrl, bio  } = user

                const newBio = `${bio}-${Math.random()}`
                const newImgProfileUrl = `${imgProfileUrl}-${Math.random()}`

                const res = await logic.updateUser(id, username, password, null, newImgProfileUrl, newBio)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(newBio).to.be.a('string')
                expect(newImgProfileUrl).to.be.a('string')
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)
                expect(_user.imgProfileUrl).to.equal(newImgProfileUrl)
                expect(_user.bio).to.equal(newBio)
            })

            it('should update on correct id, username and password, adding new password, bio and photo profile', async () => {
                const { id, username, password, imgProfileUrl, bio  } = user

                const newBio = `${bio}-${Math.random()}`
                const newImgProfileUrl = `${imgProfileUrl}-${Math.random()}`
                const newPassword = `${password}-${Math.random()}`

                const res = await logic.updateUser(id, username, password, newPassword, newImgProfileUrl, newBio)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(newBio).to.be.a('string')
                expect(newImgProfileUrl).to.be.a('string')
                expect(newPassword).to.be.a('string')
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(newPassword)
                expect(_user.imgProfileUrl).to.equal(newImgProfileUrl)
                expect(_user.bio).to.equal(newBio)
            })

            // TODO other combinations of valid updates

            false &&   it('should fail on undefined id', () => {
                const { id, name, surname, username, password } = user

                expect(() => logic.updateUser(undefined, name, surname, username, password, password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases

            false &&   describe('with existing user', () => {
                let user2

                beforeEach(async () => {
                    user2 = new User({ name: 'John', surname: 'Doe', username: 'jd2', password: '123' })

                    await user2.save()
                })

                it('should update on correct data and password', async () => {
                    const { id, name, surname, username, password } = user2

                    const newUsername = 'jd'

                    try {
                        const res = await logic.updateUser(id, null, null, newUsername, null, password)

                        expect(true).to.be.false
                    } catch (err) {
                        expect(err).to.be.instanceof(AlreadyExistsError)
                    } finally {
                        const _user = await User.findById(id)

                        expect(_user.id).to.equal(id)

                        expect(_user.name).to.equal(name)
                        expect(_user.surname).to.equal(surname)
                        expect(_user.username).to.equal(username)
                        expect(_user.password).to.equal(password)
                    }
                })
            })
        })
    })

false &&    describe('postits', () => {
        describe('add', () => {
            let user, text

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                text = `text-${Math.random()}`

                await user.save()
            })

            it('should succeed on correct data', async () => {
                const res = await logic.addPostit(user.id, text)

                expect(res).to.be.undefined

                const postits = await Postit.find()

                const [postit] = postits

                expect(postit.text).to.equal(text)

                expect(postit.user.toString()).to.equal(user.id)
            })

            // TODO other test cases
        })

        describe('list', () => {
            let user, postit, postit2

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                postit = new Postit({ text: 'hello text', user: user.id })
                postit2 = new Postit({ text: 'hello text 2', user: user.id })

                await user.save()
                await postit.save()
                await postit2.save()
            })

            it('should succeed on correct data', async () => {
                const postits = await logic.listPostits(user.id)

                const _postits = await Postit.find()

                expect(_postits.length).to.equal(2)

                expect(postits.length).to.equal(_postits.length)

                const [_postit, _postit2] = _postits

                expect(_postit.id).to.equal(postit.id)
                expect(_postit.text).to.equal(postit.text)

                expect(_postit2.id).to.equal(postit2.id)
                expect(_postit2.text).to.equal(postit2.text)

                const [__postit, __postit2] = postits

                expect(__postit).not.to.be.instanceof(Postit)
                expect(__postit2).not.to.be.instanceof(Postit)

                expect(_postit.id).to.equal(__postit.id)
                expect(_postit.text).to.equal(__postit.text)

                expect(_postit2.id).to.equal(__postit2.id)
                expect(_postit2.text).to.equal(__postit2.text)
            })
        })

        describe('remove', () => {
            let user, postit

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
                postit = new Postit({ text: 'hello text', user: user.id })

                await Promise.all([user.save(), postit.save()])
            })

            it('should succeed on correct data', async () => {
                const res = await logic.removePostit(user.id, postit.id)

                expect(res).to.be.undefined

                const postits = await Postit.find()

                expect(postits.length).to.equal(0)
            })
        })

        describe('modify', () => {
            let user, postit, newText

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
                postit = new Postit({ text: 'hello text', user: user.id })

                newText = `new-text-${Math.random()}`

                await Promise.all([user.save(), postit.save()])
            })

            it('should succeed on correct data', async () => {
                const res = await logic.modifyPostit(user.id, postit.id, newText)

                expect(res).to.be.undefined

                const postits = await Postit.find()

                expect(postits.length).to.equal(1)

                const [_postit] = postits

                expect(_postit.text).to.equal(newText)
            })
        })
    })

    after(() => mongoose.disconnect())
})