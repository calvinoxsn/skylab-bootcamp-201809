import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class VinylListCardItem extends Component {
    
    render() { 
        const { title, artist, img, year, id, comments, likes } = this.props
        return ( 
            
              <div className='card'>
                <div className='card-image'>
                  <img src={img ? img : './img/vinyl.png'} alt='vinyls'/>
                  <Link to={`/vinyl/${id}`}>
                    <a className="float">
                      <i className="fa fa-plus my-float"></i>
                    </a>
                  </Link>
                </div>
                <p className='artist-card'>{artist}</p>
                <span className='title-card'>{title}</span>
                <span className='year-card'>{year}</span>
                <div className='card-content'>
                  <span><i className="far fa-comment-alt"></i>{comments}</span>
                  <span><i className="far fa-star"></i>{likes}</span>
                </div>
              </div>

         )
    }
}
 
export default VinylListCardItem