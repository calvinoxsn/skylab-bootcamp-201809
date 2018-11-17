import React, { Component } from 'react'
import './vinylListItem.css'

class vinylListItem extends Component {
    
    render() { 
        const { title, artist } = this.props.info
        return ( 
            <li className='list-group-item'><span className='title' >{title}</span> - <span className='artist'>{artist}</span></li>
         )
    }
}
 
export default vinylListItem