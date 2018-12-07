const mongoose = require('mongoose')
const { User, Product, Order } = require('../data')
const logic = require('.')
const { AlreadyExistsError, ValueError } = require('../errors')
// const path = require('path')

const { expect } = require('chai')

const MONGO_URL = 'mongodb://localhost:27017/mzkpoint-test'

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    before(() => mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany(), Order.deleteMany()]))

    true && describe('user', () => {
        true && describe('register', () => {
            let name, surname, username, email, password

            beforeEach(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                username = `username-${Math.random()}`
                email = `${Math.random()}@gmail.com`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', async () => {
                const res = await logic.registerUser(name, surname, username, email, password)

                expect(res).to.be.undefined

                const users = await User.find()

                expect(users.length).to.equal(1)

                const [user] = users

                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.username).to.equal(username)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })

            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty name', () => {
                expect(() => logic.registerUser('', surname, username, password)).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on blank name', () => {
                expect(() => logic.registerUser('   \t\n', surname, username, password)).to.throw(ValueError, 'name is empty or blank')
            })

            // TODO other test cases
        })

        true && describe('authenticate', () => {
            let user

            beforeEach(() => (user = new User({ name: 'John', surname: 'Doe', username: 'jd', email: 'jd@gmail.com', password: '123' })).save())

            it('should authenticate on correct credentials', async () => {
                const { username, password } = user

                const id = await logic.authenticateUser(username, password)

                expect(id).to.exist
                expect(id).to.be.a('string')

                const users = await User.find()

                const [_user] = users

                expect(_user.id).to.equal(id)
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        true && describe('retrieve', () => {
            let user

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', email: 'jd@gmail.com', password: '123', wishlist: [], shoppingCart: [], checkout: [], orders: [] })

                await user.save()
            })

            it('should succeed on valid id', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user).not.to.be.instanceof(User)

                const { id, name, surname, username, email, password, wishlist, shoppingCart, checkout, orders } = _user

                expect(id).to.exist
                expect(id).to.be.a('string')
                expect(id).to.equal(user.id)
                expect(name).to.equal(user.name)
                expect(surname).to.equal(user.surname)
                expect(username).to.equal(user.username)
                expect(email).to.equal(user.email)
                expect(password).to.be.undefined
                expect(wishlist.length).to.equal(0)
                expect(shoppingCart.length).to.equal(0)
                expect(checkout.length).to.equal(0)
                expect(orders.length).to.equal(0)

            })
        })

        !true && describe('update', () => {
            let user

            beforeEach(() => (user = new User({ name: 'John', surname: 'Doe', username: 'jd', email: 'jd@gmail.com', password: '123' })).save())

            it('should update on correct data and password', async () => {
                const { id, name, surname, username, email, password } = user

                const newName = `${name}-${Math.random()}`
                const newSurname = `${surname}-${Math.random()}`
                const newUsername = `${username}-${Math.random()}`
                const newEmail = `${email}-${Math.random()}`
                const newPassword = `${password}-${Math.random()}`

                const res = await logic.updateUser(id, newName, newSurname, newUsername, newEmail, newPassword, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.name).to.equal(newName)
                expect(_user.surname).to.equal(newSurname)
                expect(_user.username).to.equal(newUsername)
                expect(_user.email).to.equal(newEmail)
                expect(_user.password).to.equal(newPassword)
            })

            it('should update on correct id, name and password (other fields null)', async () => {
                const { id, name, surname, username, email, password } = user

                const newName = `${name}-${Math.random()}`

                const res = await logic.updateUser(id, newName, null, null, null, null, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.name).to.equal(newName)
                expect(_user.surname).to.equal(surname)
                expect(_user.username).to.equal(username)
                expect(_user.email).to.equal(email)
                expect(_user.password).to.equal(password)
            })

            it('should update on correct id, surname and password (other fields null)', async () => {
                const { id, name, surname, username, email, password } = user

                const newSurname = `${surname}-${Math.random()}`

                const res = await logic.updateUser(id, null, newSurname, null, null, null, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(newSurname)
                expect(_user.username).to.equal(username)
                expect(_user.email).to.equal(email)
                expect(_user.password).to.equal(password)
            })

            // TODO other combinations of valid updates

            it('should fail on undefined id', () => {
                const { id, name, surname, username, email, password } = user

                expect(() => logic.updateUser(undefined, name, surname, username, email, password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases

            describe('with existing user', () => {
                let user2

                beforeEach(async () => {
                    user2 = new User({ name: 'John', surname: 'Doe', username: 'jd2', email: 'jd2@gmail.com', password: '123' })

                    await user2.save()
                })

                it('should update on correct data and password', async () => {
                    const { id, name, surname, username, email, password } = user2

                    const newUsername = 'jd'

                    try {
                        const res = await logic.updateUser(id, null, null, newUsername, null, null, password)

                        expect(true).to.be.false
                    } catch (err) {
                        expect(err).to.be.instanceof(AlreadyExistsError)
                    } finally {
                        const _user = await User.findById(id)

                        expect(_user.id).to.equal(id)

                        expect(_user.name).to.equal(name)
                        expect(_user.surname).to.equal(surname)
                        expect(_user.username).to.equal(username)
                        expect(_user.email).to.equal(email)
                        expect(_user.password).to.equal(password)
                    }
                })
            })
        })
    })

    true && describe('query products', () => {

        describe('search', () => {
            beforeEach(async () => {
                const instrument = 'GUITAR'
                const brand = 'Fender'
                const model = 'SG Faded 2018, Worn Bourbon'
                const features = ['a', 'b', 'c', 'd', 'e']
                const description = 'bla bla bla'
                const price = 1290
                const inStock = 10
                const imageUrl = "https://d1aeri3ty3izns.cloudfront.net/media/36/367294/1200/preview.jpg"
                const underWarranty = true
                const type = 'ELECTRIC'

                productOne = new Product({ instrument, brand: 'Fender', model, features, description, price, inStock, imageUrl, underWarranty, type })
                productTwo = new Product({ instrument, brand, model: 'Telecaster', features, description, price, inStock, imageUrl, underWarranty, type })
                productThree = new Product({ instrument, brand, model: 'Telecaster', features, description, price, inStock, imageUrl, underWarranty, type })
                productFour = new Product({ instrument: 'GUITAR', brand, model, features, description, price, inStock, imageUrl, underWarranty, type })

                await productOne.save()
                await productTwo.save()
                await productThree.save()
                await productFour.save()
            })


            it('should succeed on correct data', async () => {
                const search = 'GUITAR'
                const _products = await logic.searchProducts(search)

                expect(_products.length).to.equal(4)

            })

            it('should succeed on correct data', async () => {
                const search = 'Telecaster'
                const _products = await logic.searchProducts(search)

                expect(_products.length).to.equal(2)

            })

            it('should succeed on correct data', async () => {
                const search = 'Fender'
                const _products = await logic.searchProducts(search)

                expect(_products.length).to.equal(4)

            })

            it('should succeed on correct data', async () => {
                const search = 'Fender'
                const _products = await logic.searchProducts(search)

                expect(_products.length).to.equal(4)

            })

            it('should fail on undefined query', () => {
                const search = undefined

                expect(() => logic.searchProducts(search)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty query', () => {
                const search = ''

                expect(() => logic.searchProducts(search)).to.throw(ValueError, `${search} is empty or blank`)
            })

            it('should fail on blank query', () => {
                const search = '  '

                expect(() => logic.searchProducts(search)).to.throw(ValueError, `search is empty or blank`)
            })

            it('should fail on no string query (boolean)', () => {
                const search = false

                expect(() => logic.searchProducts(search)).to.throw(TypeError, 'false is not a string')
            })
        })

        describe('filter', () => {
            beforeEach(async () => {
                const instrument = 'GUITAR'
                const brand = 'Fender'
                const model = 'SG Faded 2018, Worn Bourbon'
                const features = ['a', 'b', 'c', 'd', 'e']
                const description = 'bla bla bla'
                const price = 1290
                const inStock = 10
                const imageUrl = "https://d1aeri3ty3izns.cloudfront.net/media/36/367294/1200/preview.jpg"
                const underWarranty = true
                const type = 'ELECTRIC'

                product = new Product({ instrument: 'GUITAR', brand, model, features, description, price, inStock, imageUrl, underWarranty, type })

                await product.save()
            })

            it('should succeed on correct data', async () => {
                const query = 'GUITAR'
                const _products = await logic.filterProduct(query)

                expect(_products.length).to.equal(1)

            })

            it('should fail on undefined query', () => {
                const query = undefined

                expect(() => logic.filterProduct(query)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty query', () => {
                const query = ''

                expect(() => logic.filterProduct(query)).to.throw(ValueError, `${query} is empty or blank`)
            })

            it('should fail on blank query', () => {
                const query = '  '

                expect(() => logic.filterProduct(query)).to.throw(ValueError, `query is empty or blank`)
            })

            it('should fail on no string query (boolean)', () => {
                const query = false

                expect(() => logic.filterProduct(query)).to.throw(TypeError, 'false is not a string')
            })

        })

    })

    true && describe('logged user', () => {
        let user

        beforeEach(async () => {
            user = new User({ name: 'John', surname: 'Doe', username: 'jd', email: 'jd@gmail.com', password: '123', wishlist: [], shoppingCart: [], checkout: [], orders: [] })

            await user.save()

            const instrument = 'GUITAR'
            const brand = 'Fender'
            const model = 'SG Faded 2018, Worn Bourbon'
            const features = ['a', 'b', 'c', 'd', 'e']
            const description = 'bla bla bla'
            const price = 1290
            const inStock = 10
            const imageUrl = "https://d1aeri3ty3izns.cloudfront.net/media/36/367294/1200/preview.jpg"
            const underWarranty = true
            const type = 'ELECTRIC'

            product = new Product({ instrument, brand, model, features, description, price, inStock, imageUrl, underWarranty, type })

            await product.save()

        })

        describe('add item to wishlist', () => {


            it('should succeed on correct data', async () => {
                let userId = user.id.toString()
                let productId = product.id.toString()

                await logic.addItemToWishlist(userId, productId)

                const _user = await User.findById(userId)

                expect(_user.wishlist.length).to.equal(1)

            })

            it('should fail on undefined id', () => {

                const productId = undefined
                const userId = '5c08fe7ada43782044846b8d'

                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty id', () => {
                const productId = ''
                const userId = '5c08fe7ada43782044846b8df'
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(ValueError, `${productId} is empty or blank`)
            })

            it('should fail on blank id', () => {
                const productId = '  '
                const userId = '5c08fe7ada43782044846b8dg'
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(ValueError, `userId is empty or blank`)
            })

            it('should fail on no string id (boolean)', () => {
                const productId = false
                const userId = '5c08fe7ada43782044846b8dd'
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(TypeError, 'false is not a string')
            })

            it('should fail on undefined userId', () => {
                const productId = 'hhh3h43h'
                const userId = undefined
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(TypeError, `undefined is not a string`)
            })

            it('should fail on empty userId', () => {
                const productId = 'hhh3h43h'
                const userId = ''
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(ValueError, `${userId} is empty or blank`)
            })

            it('should fail on blank userId', () => {
                const productId = 'hhh3h43h'
                const userId = '  '
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(ValueError, `productId is empty or blank`)
            })

            it('should fail on no string userId (boolean)', () => {
                const productId = 'hhh3h43h'
                const userId = false
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(TypeError, `false is not a string`)
            })
        })

        describe('remove item in wishlist', () => {

            it('should succeed on correct data', async () => {
                let userId = user.id.toString()
                let productId = product.id.toString()

                await logic.removeItemInWishlist(userId, productId)

                const _user = await User.findById(userId)

                expect(_user.wishlist.length).to.equal(0)

            })

            it('should fail on undefined id', () => {

                const productId = undefined
                const userId = '5c08fe7ada43782044846b8d'

                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty id', () => {
                const productId = ''
                const userId = '5c08fe7ada43782044846b8df'
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(ValueError, `${productId} is empty or blank`)
            })

            it('should fail on blank id', () => {
                const productId = '  '
                const userId = '5c08fe7ada43782044846b8dg'
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(ValueError, `userId is empty or blank`)
            })

            it('should fail on no string id (boolean)', () => {
                const productId = false
                const userId = '5c08fe7ada43782044846b8dd'
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(TypeError, 'false is not a string')
            })

            it('should fail on undefined userId', () => {
                const productId = 'hhh3h43h'
                const userId = undefined
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(TypeError, `undefined is not a string`)
            })

            it('should fail on empty userId', () => {
                const productId = 'hhh3h43h'
                const userId = ''
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(ValueError, `${userId} is empty or blank`)
            })

            it('should fail on blank userId', () => {
                const productId = 'hhh3h43h'
                const userId = '  '
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(ValueError, `productId is empty or blank`)
            })

            it('should fail on no string userId (boolean)', () => {
                const productId = 'hhh3h43h'
                const userId = false
                expect(() => logic.addItemToWishlist(productId, userId)).to.throw(TypeError, `false is not a string`)
            })

        })

        describe('show wishlist', () => {

            it('should succeed on correct data', async () => {
                let userId = user.id.toString()
                let productId = product.id.toString()

                await logic.addItemToWishlist(userId, productId)

                await logic.showWishlist(userId, productId)

                const _user = await User.findById(userId)

                expect(_user.wishlist.length).to.equal(1)

            })
        })

        describe('add item to shopping cart', () => {


            it('should succeed on correct data', async () => {
                let userId = user.id.toString()
                let productId = product.id.toString()

                await logic.addItemToCart(userId, productId)

                const _user = await User.findById(userId)

                expect(_user.shoppingCart.length).to.equal(1)

            })

            it('should fail on undefined id', () => {

                const productId = undefined
                const userId = '5c08fe7ada43782044846b8d'

                expect(() => logic.addItemToCart(productId, userId)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty id', () => {
                const productId = ''
                const userId = '5c08fe7ada43782044846b8df'
                expect(() => logic.addItemToCart(productId, userId)).to.throw(ValueError, `${productId} is empty or blank`)
            })

            it('should fail on blank id', () => {
                const productId = '  '
                const userId = '5c08fe7ada43782044846b8dg'
                expect(() => logic.addItemToCart(productId, userId)).to.throw(ValueError, `userId is empty or blank`)
            })

            it('should fail on no string id (boolean)', () => {
                const productId = false
                const userId = '5c08fe7ada43782044846b8dd'
                expect(() => logic.addItemToCart(productId, userId)).to.throw(TypeError, 'false is not a string')
            })

            it('should fail on undefined userId', () => {
                const productId = 'hhh3h43h'
                const userId = undefined
                expect(() => logic.addItemToCart(productId, userId)).to.throw(TypeError, `undefined is not a string`)
            })

            it('should fail on empty userId', () => {
                const productId = 'hhh3h43h'
                const userId = ''
                expect(() => logic.addItemToCart(productId, userId)).to.throw(ValueError, `${userId} is empty or blank`)
            })

            it('should fail on blank userId', () => {
                const productId = 'hhh3h43h'
                const userId = '  '
                expect(() => logic.addItemToCart(productId, userId)).to.throw(ValueError, `productId is empty or blank`)
            })

            it('should fail on no string userId (boolean)', () => {
                const productId = 'hhh3h43h'
                const userId = false
                expect(() => logic.addItemToCart(productId, userId)).to.throw(TypeError, `false is not a string`)
            })
        })

        describe('remove item in shopping cart', () => {
            it('should succeed on correct data', async () => {
                let userId = user.id.toString()
                let productId = product.id.toString()

                await logic.removeItemInCart(userId, productId)

                const _user = await User.findById(userId)

                expect(_user.wishlist.length).to.equal(0)

            })

            it('should fail on undefined id', () => {

                const productId = undefined
                const userId = '5c08fe7ada43782044846b8d'

                expect(() => logic.removeItemInCart(productId, userId)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty id', () => {
                const productId = ''
                const userId = '5c08fe7ada43782044846b8df'
                expect(() => logic.removeItemInCart(productId, userId)).to.throw(ValueError, `${productId} is empty or blank`)
            })

            it('should fail on blank id', () => {
                const productId = '  '
                const userId = '5c08fe7ada43782044846b8dg'
                expect(() => logic.removeItemInCart(productId, userId)).to.throw(ValueError, `userId is empty or blank`)
            })

            it('should fail on no string id (boolean)', () => {
                const productId = false
                const userId = '5c08fe7ada43782044846b8dd'
                expect(() => logic.removeItemInCart(productId, userId)).to.throw(TypeError, 'false is not a string')
            })

            it('should fail on undefined userId', () => {
                const productId = 'hhh3h43h'
                const userId = undefined
                expect(() => logic.removeItemInCart(productId, userId)).to.throw(TypeError, `undefined is not a string`)
            })

            it('should fail on empty userId', () => {
                const productId = 'hhh3h43h'
                const userId = ''
                expect(() => logic.removeItemInCart(productId, userId)).to.throw(ValueError, `${userId} is empty or blank`)
            })

            it('should fail on blank userId', () => {
                const productId = 'hhh3h43h'
                const userId = '  '
                expect(() => logic.removeItemInCart(productId, userId)).to.throw(ValueError, `productId is empty or blank`)
            })

            it('should fail on no string userId (boolean)', () => {
                const productId = 'hhh3h43h'
                const userId = false
                expect(() => logic.removeItemInCart(productId, userId)).to.throw(TypeError, `false is not a string`)
            })

        })

        describe('show shopping cart', () => {

            it('should succeed on correct data', async () => {
                let userId = user.id.toString()
                let productId = product.id.toString()

                await logic.addItemToCart(userId, productId)

                await logic.showCart(userId, productId)

                const _user = await User.findById(userId)

                expect(_user.shoppingCart.length).to.equal(1)

            })

        })

        describe('add item to checkout area', () => {


            it('should succeed on correct data', async () => {
                let userId = user.id.toString()
                let productId = product.id.toString()

                await logic.addItemToCheckout(userId, productId)

                const _user = await User.findById(userId)

                expect(_user.checkout.length).to.equal(1)

            })

            it('should fail on undefined id', () => {

                const productId = undefined
                const userId = '5c08fe7ada43782044846b8d'

                expect(() => logic.addItemToCheckout(productId, userId)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty id', () => {
                const productId = ''
                const userId = '5c08fe7ada43782044846b8df'
                expect(() => logic.addItemToCheckout(productId, userId)).to.throw(ValueError, `${productId} is empty or blank`)
            })

            it('should fail on blank id', () => {
                const productId = '  '
                const userId = '5c08fe7ada43782044846b8dg'
                expect(() => logic.addItemToCheckout(productId, userId)).to.throw(ValueError, `userId is empty or blank`)
            })

            it('should fail on no string id (boolean)', () => {
                const productId = false
                const userId = '5c08fe7ada43782044846b8dd'
                expect(() => logic.addItemToCheckout(productId, userId)).to.throw(TypeError, 'false is not a string')
            })

            it('should fail on undefined userId', () => {
                const productId = 'hhh3h43h'
                const userId = undefined
                expect(() => logic.addItemToCheckout(productId, userId)).to.throw(TypeError, `undefined is not a string`)
            })

            it('should fail on empty userId', () => {
                const productId = 'hhh3h43h'
                const userId = ''
                expect(() => logic.addItemToCheckout(productId, userId)).to.throw(ValueError, `${userId} is empty or blank`)
            })

            it('should fail on blank userId', () => {
                const productId = 'hhh3h43h'
                const userId = '  '
                expect(() => logic.addItemToCheckout(productId, userId)).to.throw(ValueError, `productId is empty or blank`)
            })

            it('should fail on no string userId (boolean)', () => {
                const productId = 'hhh3h43h'
                const userId = false
                expect(() => logic.addItemToCheckout(productId, userId)).to.throw(TypeError, `false is not a string`)
            })
        })

        describe('remove item in checkout area', () => {
            it('should succeed on correct data', async () => {
                let userId = user.id.toString()
                let productId = product.id.toString()

                await logic.removeItemInCheckout(userId, productId)

                const _user = await User.findById(userId)

                expect(_user.shoppingCart.length).to.equal(0)

            })

            it('should fail on undefined id', () => {

                const productId = undefined
                const userId = '5c08fe7ada43782044846b8d'

                expect(() => logic.removeItemInCheckout(productId, userId)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty id', () => {
                const productId = ''
                const userId = '5c08fe7ada43782044846b8df'
                expect(() => logic.removeItemInCheckout(productId, userId)).to.throw(ValueError, `${productId} is empty or blank`)
            })

            it('should fail on blank id', () => {
                const productId = '  '
                const userId = '5c08fe7ada43782044846b8dg'
                expect(() => logic.removeItemInCheckout(productId, userId)).to.throw(ValueError, `userId is empty or blank`)
            })

            it('should fail on no string id (boolean)', () => {
                const productId = false
                const userId = '5c08fe7ada43782044846b8dd'
                expect(() => logic.removeItemInCheckout(productId, userId)).to.throw(TypeError, 'false is not a string')
            })

            it('should fail on undefined userId', () => {
                const productId = 'hhh3h43h'
                const userId = undefined
                expect(() => logic.removeItemInCheckout(productId, userId)).to.throw(TypeError, `undefined is not a string`)
            })

            it('should fail on empty userId', () => {
                const productId = 'hhh3h43h'
                const userId = ''
                expect(() => logic.removeItemInCheckout(productId, userId)).to.throw(ValueError, `${userId} is empty or blank`)
            })

            it('should fail on blank userId', () => {
                const productId = 'hhh3h43h'
                const userId = '  '
                expect(() => logic.removeItemInCheckout(productId, userId)).to.throw(ValueError, `productId is empty or blank`)
            })

            it('should fail on no string userId (boolean)', () => {
                const productId = 'hhh3h43h'
                const userId = false
                expect(() => logic.removeItemInCheckout(productId, userId)).to.throw(TypeError, `false is not a string`)
            })

        })

        describe('show item(s) in checkout area', () => {

            it('should succeed on correct data', async () => {
                let userId = user.id.toString()
                let productId = product.id.toString()

                await logic.addItemToCheckout(userId, productId)

                await logic.showCheckout(userId, productId)

                const _user = await User.findById(userId)

                expect(_user.checkout.length).to.equal(1)

            })

        })

        describe('create order', () => {

            it('should succeed on correct data', async () => {
                const products = [product.id]

                const _user = user.id

                const order = await logic.createOrder(_user, products)

                expect(order).to.be.exist

                expect(order.user.toString()).to.be.equal(_user)

            })
        })
    })

    after(() => mongoose.disconnect())
})