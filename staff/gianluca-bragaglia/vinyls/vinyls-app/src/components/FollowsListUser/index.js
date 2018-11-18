import React, { Component } from 'react'
import FollowsListUserItem from '../FollowsListUserItem'
import logic from '../../logic'

//import './index.css'



class FollowsListUser extends Component {

    state = { username: '', imgProfileUrl: null, bio: '', error: null, follows: [], followers: [] }
    
    componentDidMount() {
        try {       
            logic.retrieveFollowsListUser()        
            .then(res => {
                this.setState ({ followSelected: res })
            })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
    render() { 

        const { follows } = this.state
        
        return ( 
            <React.Fragment>
                <p>followlistuser</p>
                <div className='vinyls-list'>
                        <ul className='list-group-flush'>
                        {follows.map(follow => (
                            <FollowsListUserItem key={follow.id} info={follows}/>
                        ))}
                        </ul>
                </div>

            </React.Fragment>
         )
    }
}

 
export default FollowsListUser