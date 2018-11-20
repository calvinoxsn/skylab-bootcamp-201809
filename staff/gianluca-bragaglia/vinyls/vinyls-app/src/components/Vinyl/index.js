import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'mdbreact'
import Error from '../Error'
import logic from '../../logic'
//import './index.css'



class Vinyl extends Component {
    state = { title: '', artist: '', year: 0, info:'', imgVinylUrl: null, comments:[], likes:[], error: null }


    // componentDidMount() {
    //     try {
    //         logic.retrieveVinyl(id)
    //         .then(vinyl => { this.setState({ title: vinyl.title, artist: vinyl.artist, year: vinyl.year, info: vinyl.info, imgVinylUrl: vinyl.imgVinylUrl  }) })
    //         .catch(err => this.setState({ error: err.message }))
    //     } catch (err) {
    //         this.setState({ error: err.message })
    //     }
    // }



    render() {

        const {error, imgVinylUrl, info } = this.state

        return <div className='vinyl-container'>
                <img className='profile-img'  src={imgVinylUrl ? imgVinylUrl : './img/vinyl.png'} ></img>
                <br></br>
                {error && <Error message={error} />}
                <Button type='button' onClick={this.uploadWidget} color='black' >Upload Image</Button>
                
        </div>
    }
}

export default withRouter(Vinyl)