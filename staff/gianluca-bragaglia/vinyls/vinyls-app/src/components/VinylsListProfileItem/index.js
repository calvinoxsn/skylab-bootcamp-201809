import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Error from '../Error'
import logic from '../../logic'
//import './index.css'

class vinylsListProfileItem extends Component {

    state = { deleted: false, error: null}

    handleRemoveVinyl = () => {
       
        try {       
            
            logic.removeVinyl(this.props.id)
            .then(() => this.setState({ deleted: true, error: null }))
            .catch(err => this.setState({ error: err.message }))
            // logic. retrieveVinylsCurrentUser()        
            // .then(vinyls => {this.setState ({ vinyls })})
            // .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
    
    render() { 
        const { title, artist, img, id } = this.props

        const { deleted, error } = this.state
        return ( <div>
                    {error && <Error message={error} />}
                    { !deleted ? <section>
                        <Link to={`/vinyl/${id}`}>
                            <li className='list-group-item'>
                                <span><img className='vinyl-img-small' src={img ? img : './img/vinyl.png'}></img></span> 
                                <span className='title' >{title}</span>
                                <span className='artist'>{artist}</span>
                            </li>
                        </Link>
                        <button onClick={this.handleRemoveVinyl}>delete</button>
                        <button>edit</button>
                    </section> : null}
                </div>
            
         )
    }
}
 
export default vinylsListProfileItem