import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'mdbreact'
import Error from '../Error'
import logic from '../../logic'
//import './index.css'



class Vinyl extends Component {
    state = { title: '', artist: '', year: 0, info:'', imgVinylUrl: null, comments:[], likes:[], error: null }


    componentDidMount() {
        try {
            logic.retrieveVinylById(this.props.id)
            .then(vinyl => { this.setState({ title: vinyl.title, artist: vinyl.artist, year: vinyl.year, info: vinyl.info, imgVinylUrl: vinyl.imgVinylUrl, comments: vinyl.comments, likes: vinyl.likes }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }



    render() {

        const {error, imgVinylUrl, artist, title, year, info } = this.state

        return  <div className='vinyl-container'>
                    <img className='profile-img'  src={imgVinylUrl ? imgVinylUrl : './img/vinyl.png'} ></img>
                    <br></br>
                    {error && <Error message={error} />}
                    <p className='vinyl-title'>{title}</p>
                    <p className='vinyl-artist'>{artist}</p>
                    <p className='vinyl-year'>{year}</p>
                    <p className='vinyl-info'>{info}</p>           
                </div>
    }
}

export default withRouter(Vinyl)