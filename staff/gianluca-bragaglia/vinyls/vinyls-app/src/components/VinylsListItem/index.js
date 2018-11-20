import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class vinylsListItem extends Component {
    
    render() { 
        const { title, artist, img, id } = this.props
        return ( 
            <Link to={`/vinyl/${id}`}><li className='list-group-item'> <span><img className='vinyl-img-small' src={img ? img : './img/vinyl.png'}></img></span> <span className='title' >{title}</span><span className='artist'>{artist}</span></li></Link>
         )
    }
}
 
export default vinylsListItem