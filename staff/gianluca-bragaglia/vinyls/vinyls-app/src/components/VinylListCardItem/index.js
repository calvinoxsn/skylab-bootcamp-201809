import React, { Component } from 'react'
import './vinylListCardItem.css'

class VinylListCardItem extends Component {
    
    render() { 
        const { title, artist, imageUrl, year } = this.props.info
        return ( 
            
              <div className='card'>
                <div className='card-image'>
                  <img src={imageUrl} alt='vinyls'/>
                  <a href="#" className="float">
                    <i className="fa fa-plus my-float"></i>
                  </a>
                  <p className='artist'>{artist}</p>
                </div>
                <span className='title'>{title}</span>
                <span className='year'>{year}</span>
                <div className='card-content'>
                  <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                </div>
              </div>

         )
    }
}
 
export default VinylListCardItem