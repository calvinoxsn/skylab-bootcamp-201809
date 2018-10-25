//import logic from './logic'

require('isomorphic-fetch')

global.sessionStorage = require('sessionstorage')

const logic = require('./logic')

const { expect } = require('chai')

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    false && describe('users', () => {
        describe('register', () => {
            it('should succeed on correct data', () =>
                logic.signIn(`jd-${Math.random()}`, 'john@john.com', 'John', 'Doe', '123')
                    .then(() => expect(true).to.be.true)
            )

            it('should fail on trying to register twice same user', () => {
                const username = `jd-${Math.random()}`

                return logic.signIn(username, 'john@john.com', 'John', 'Doe', '123')
                    .then(() => logic.signIn(username, 'john@john.com', 'John', 'Doe', '123'))
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`user with username "${username}" already exists`)
                    })
            })

            it('should fail on undefined name', () => {
                expect(() =>
                    logic.signIn(`jd-${Math.random()}`, 'john@john.com', undefined, 'Doe', '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other cases
        })

        describe('log in', () => {
            describe('with existing user', () => {
                let username, password

                beforeEach(() => {
                    const name = 'John', surname = 'Doe', email = 'john@john'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    return logic.signIn(username, email, name, surname, password)
                })

                it('should succeed on correct data', () =>
                    logic.logIn(username, password)
                        .then(() => expect(true).to.be.true)
                )

                it('should fail on wrong username', () => {
                    username = `dummy-${Math.random()}`

                    return logic.logIn(username, password)
                        .catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal(`user with username "${username}" does not exist`)
                        })
                })

                it('should fail on wrong password', () => {
                    password = 'pepito'

                    return logic.logIn(username, password)
                        .catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal('username and/or password wrong')
                        })
                })
            })

            it('should fail on undefined username', () => {
                const username = undefined

                expect(() =>
                    logic.logIn(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            it('should fail on boolean username', () => {
                const username = true

                expect(() =>
                    logic.logIn(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            it('should fail on numeric username', () => {
                const username = 123

                expect(() =>
                    logic.logIn(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            // TODO other cases
        })
        describe('user movies', () => {

            describe('update user seen movies list', () => {
                it('should update the list of user seen movies', () => {
                    const movie = { id: '123', name: 'the great film' }
                    logic.updateUserSeen(movie)
                        .then(() => {
                            expect(true).to.be.true
                            expect(this._userSeen.length).to.equal(1)
                        })
                })
            })

            describe('update user pending movies list', () => {
                it('should update the list of user seen movies', () => {
                    const movie = { id: '123', name: 'the great film' }
                    logic.updateUserPending(movie)
                        .then(() => {
                            expect(true).to.be.true
                            expect(this._userPending.length).to.equal(1)
                        })
                })
            })

            // describe('update user favourites movies list', () => {
            //     it('should update the list of user seen movies', () => {
            //         const movie = {id: '123', name: 'the great film'}
            //         logic.updateUserFavourites(movie)
            //             .then(() => {
            //                 expect(true).to.be.true
            //                 expect(this._userFavourites.length).to.equal(1)
            //             })
            //     })
            // })

            describe('retrieve user seen list movies', () => {
                beforeEach(() => {
                    const movie = { id: '123', name: 'the great film' }
                    logic.updateUserSeen(movie)
                    logic.updateUserPending(movie)
                    logic.updateUserFavourites(movie)
                })
                it('should return the list of user seen movies', () => {
                    logic.retrieveUserMovies()
                        .then(() => {
                            expect(true).to.be.true
                            expect(this._userSeen.length).to.equal(1)
                            expect(this._userPending.length).to.equal(1)
                            expect(this._userFavourites.length).to.equal(1)

                        })
                })
            })

        })
    })

    describe('movies', () => {
        //Put max pagination to 5(100 movies)
        false && describe('retrieve without user intervention', () => {
            describe('trending-slider', () => {
                it('should return trending movies', () => {
                    logic.retrieveTrending()
                        .then(movies => {
                            expect(movies).not.to.be.undefined
                            expect(movies.length).to.be.above(0)
                        })
                })
            })
            describe('in theatre', () => {
                it('should return in theatre movies', () => {
                    logic.retrieveInTheatre()
                        .then(movies => {
                            expect(movies).not.to.be.undefined
                            expect(movies.length).to.be.above(0)
                        })
                })
            })
            describe('populars', () => {
                it('should return popular movies', () => {
                    logic.retrievePopular()
                        .then(movies => {
                            expect(movies).not.to.be.undefined
                            expect(movies.length).to.be.above(0)
                        })
                })
            })

        })
        false && describe('retrieve with user intervention', () => {
            describe('search movies', () => {
                let query, page
                beforeEach(() => {
                    query = 'harry+potter'
                    page = 1
                })
                it('should return movies with required query and page', () => {
                    logic.retrieveMovies(query, page)
                        .then(movies => {
                            expect(movies).not.to.be.undefined
                            expect(movies.length).to.be.above(0)
                        })
                })
                it('should fail on undefined query', () => {
                    query = undefined
                    expect(() =>
                        logic.retrieveMovies(query)
                    ).to.throw(Error, `${query} is not a valid query`)

                })
                //TODO other cases 
                it('should fail on undefined page', () => {
                    page = undefined
                    expect(() =>
                        logic.retrieveMovies(page)
                    ).to.throw(Error, `${page} is not a valid page`)

                })
                //TODO other cases  
            })
            describe('retrieve movie', () => {
                let movieId
                beforeEach(() => {
                    movieId = '293660'
                })
                it('should return the movie extended information', () => {
                    logic.retrieveMovie(movieId)
                        .then(movies => {
                            expect(movies).not.to.be.undefined
                            expect(movies.length).to.be.above(0)
                        })
                })
                it('should fail on undefined movieId', () => {
                    movieId = undefined
                    expect(() =>
                        logic.retrieveMovie(movieId)
                    ).to.throw(Error, `${movieId} is not a valid movieId`)
                })
                //TODO other cases  
            })

        })
        describe('movies state', () => {
            describe('check movie status', () => {
                let movieId
                beforeEach(() => {
                    movieId = '293660'
                })
                false && describe('with user logged in', () => {
                    let movie, username, password
                    beforeEach(() => {
                        const name = 'John', surname = 'Doe', email = 'john@john'
                        username = `jd-${Math.random()}`, password = '123'
                        movie = { id: '293660', name: 'the great film' }

                        return logic.signIn(username, email, name, surname, password)
                            .then(() => {
                                return logic.logIn(username, password)
                                    .then(() => logic.retrieveUserData())
                            })
                    })
                    it('should succeed on returning if the movie is inside seen list', () => {

                        return logic.addUserSeen(movie)
                            .then(() => {
                                let status = logic.checkMovieStatus(movieId)
                                expect(status).to.be.a('string')

                                expect(status).to.equal('seen')
                            })
                    })
                    it('should succeed on returning undefined if the movie is not inside the list', () => {
                        let status = logic.checkMovieStatus(movieId)

                        expect(status).to.be.an('undefined')
                    })


                })
                describe('without user logged in', () => {

                    it('should succeed on returning undefined if the user is not loged in ', () => {
                        let status = logic.checkMovieStatus(movieId)
                        expect(status).to.be.undefined
                    })
                    it('should fail with undefined movie id', () => {
                        movieId = undefined
                        expect(() => 
                            logic.checkMovieStatus(movieId)
                        ).to.throw(Error, `${movieId} is not a string`)
                    })
                    it('should fail with null movie id', () => {
                        movieId = null
                        expect(() => 
                            logic.checkMovieStatus(movieId)
                        ).to.throw(Error, `${movieId} is not a string`)
                    })
                    it('should fail with not a string movie id (number)', () => {
                        movieId = 1234
                        expect(() => 
                            logic.checkMovieStatus(movieId)
                        ).to.throw(Error, `${movieId} is not a string`)
                    })
                    it('should fail with not a string movie id (boolean)', () => {
                        movieId = true
                        expect(() => 
                            logic.checkMovieStatus(movieId)
                        ).to.throw(Error, `${movieId} is not a string`)
                    })
                    it('should fail with not a string movie id (object)', () => {
                        movieId = {}
                        expect(() => 
                            logic.checkMovieStatus(movieId)
                        ).to.throw(Error, `${movieId} is not a string`)
                    })
                    it('should fail with not a string movie id (array)', () => {
                        movieId = []
                        expect(() => 
                            logic.checkMovieStatus(movieId)
                        ).to.throw(Error, `${movieId} is not a string`)
                    })
                })
            })

        })
    })
})