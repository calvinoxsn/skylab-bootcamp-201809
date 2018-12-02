import React, { Component } from 'react'
import FollowsListUserItem from '../FollowsListUserItem'
import logic from '../../logic'

class ChatList extends Component {

    state = { followsListUser: [], error: null }

    componentDidMount() {

        try {              
            logic.retrieveFollowsListUser()
            .then(followsListUser => { this.setState({ followsListUser }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
     

  render() {

    const { followsListUser } = this.state


    return (
        <div>
            <h3>Start Chat With</h3>
            <div className='list-group-flush'>
            <ul className='list-group-flush'>
                    {followsListUser.map(follow => (
                        <FollowsListUserItem key={follow.username} id={follow.idUser} username={follow.username} imgProfileUrl={follow.imgProfileUrl} />
                    ))}
            </ul>
            </div>
        </div>
    )
  }
}

export default  ChatList