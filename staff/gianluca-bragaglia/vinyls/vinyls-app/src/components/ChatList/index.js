import React, { Component } from 'react'
import FriendsListItem from '../FriendsListItem'
import logic from '../../logic'

class ChatList extends Component {

    state = { friendsList: [], error: null }

    componentDidMount() {

        try {              
            logic.retrieveFriendsList()
            .then(friendsList => { this.setState({ friendsList }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
     

  render() {

    const { friendsList } = this.state


    return (
        <div>
            <h3>Start Chat With</h3>
            <div className='list-group-flush'>
                    {friendsList.map(friend => (
                        <FriendsListItem key={friend.username} id={friend.idUser} username={friend.username} imgProfileUrl={friend.imgProfileUrl}/>

                    ))}
            </div>
        </div>
    )
  }
}

export default  ChatList