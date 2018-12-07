import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import logic from '../../logic'
import Moment from 'react-moment'
import './MyOrders.sass'

class MyOrders extends Component {

    state = {
        userOrders: []
    }

    componentDidMount() {
        logic.showOrders()
            .then(userOrders => { this.setState({ userOrders: userOrders.orders }) })
    }

    render() {
        return (
            <div >
                <h1>My Orders</h1>
                <span><NavLink to="home"><span>Go Back</span></NavLink></span>
                <div >
                    {this.state.userOrders.map(order =>
                        <ul className="order-history">
                            <p className="order-id">Order Id Number(for tracking purposes): {order._id}</p>
                            {order.products.map(item => <p className="order-id-details" key={Math.random()}> {item.model} {item.brand}, {item.price}€</p>)}
                            <p className="date">Purchase Date: <Moment format="YYYY/MM/DD">{order.date.toString()}</Moment></p>
                            <p className="total-paid">Total paid: {order.total}€</p>
                        </ul>
                    )
                    }
                </div>

            </div>
        )
    }
}


export default MyOrders
