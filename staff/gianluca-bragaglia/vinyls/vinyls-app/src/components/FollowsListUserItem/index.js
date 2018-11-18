import React, { Component } from 'react'


//import './index.css'



class FollowsListUserItem extends Component {
    
    render() { 
        const { imgProfileUrl, username } = this.props.info
        return ( 
            <li className='list-group-item'><img className='profile-img' src={imgProfileUrl ? imgProfileUrl : './img/icon-profile.png'} ></img> - <span className='artist'>{username}</span></li>
         )
    }
}
 

 
export default FollowsListUserItem