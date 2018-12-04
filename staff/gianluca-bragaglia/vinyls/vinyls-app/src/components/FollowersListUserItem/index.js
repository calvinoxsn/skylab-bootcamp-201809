import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'



const FollowersListUserItem = (props) => {

    const { imgProfileUrl, username, id } = props

    
    return (
        <li className='list-group-item'><Link to={`/profile/${id}`}><img className='profile-img-list' src={imgProfileUrl ? imgProfileUrl : './img/icon-profile.png'} ></img> <span className='profile-username-list'>{username}</span></Link></li>
    )
}


export default FollowersListUserItem