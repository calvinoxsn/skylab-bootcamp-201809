import React, { Component } from 'react'
import logic from '../../logic'

class MyShoppingCart extends Component {
    state = { shoppingCart: [] }

    componentDidMount() {
        logic.showCart()
            .then(shoppingCart => { this.setState({ shoppingCart }) })
    }

    handleRemoveProduct = id =>
        logic.removeItemInCart(id)
            .then(() => logic.showCart())
            .then(wishlist => this.setState({ wishlist }))

    render() {
        return <div>
            <h1>My Shopping Cart</h1>
            <a href="#" onClick={this.props.onGoBack}>Go back</a>

            <section>
                {/* {this.state.postits.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)} */}
            </section>
        </div>
    }
}

export default MyShoppingCart