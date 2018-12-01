import React, { Component } from 'react'
import logic from '../../logic'

class MyWishlist extends Component {
    state = { userWishlist: [] }

    componentDidMount() {
        logic.showWishlist()
            .then(userWishlist => { this.setState({ userWishlist: userWishlist.wishlist }) })
    }

    handleRemoveProduct = id =>
        logic.removeItemInWishlist(id)
            .then(() => logic.showWishlist())
            .then(userWishlist => this.setState({ userWishlist }))

    render() {
        return <div>
            <h1>My Wishlist</h1>
            <a href="#" onClick={this.props.onGoBack}>Go back</a>

            <section>
                {this.state.userWishlist.map(item => {

                    return (
                        <li>{item.instrument}</li>
                    )
                })}
            </section>
        </div>
    }
}

export default MyWishlist