import React, { Component } from 'react'
import FollowsListUserItem from '../FollowsListUserItem'
import logic from '../../logic'

//import './index.css'



class FollowsListUser extends Component {

    state = { username: '', imgProfileUrl: null, bio: '', error: null, followsListUser: [] }
    
    componentDidMount() {
        try {       
            logic.retrieveFollowsListUser()        
            .then(res => {
                this.setState ({ username: res.username, imgProfileUrl: res.imgProfileUrl, followsListUser: res })
            })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
    render() { 

        const { followsListUser } = this.state
        
        return ( 
            <React.Fragment>
                {/* <p>followlistuser</p> */}
                <div className='vinyls-list'>
                        <ul className='list-group-flush'>
                        {followsListUser.map(follow => (
                            <FollowsListUserItem key={follow.username} id={follow.idUser} username={follow.username} imgProfileUrl={follow.imgProfileUrl} />
                        ))}
                        </ul>
                </div>

            </React.Fragment>
         )
    }
}

 
export default FollowsListUser