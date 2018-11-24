import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import './index.css'




class VinylsSearchListItem extends Component {
    
    render() { 
        const { title, img, id } = this.props
        return ( 
            <li className='list-group-item'><Link to={`/vinyl/${id}`}><img className='profile-img-list' src={img ? img : './img/vinyl.png'} ></img> <span className='profile-username-list'>{title}</span></Link></li>
         )
    }
}
 

 
export default VinylsSearchListItem