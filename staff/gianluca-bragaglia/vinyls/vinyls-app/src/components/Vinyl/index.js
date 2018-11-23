import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'mdbreact'
import Error from '../Error'
import logic from '../../logic'
import './index.css'



class Vinyl extends Component {
    state = { title: '', artist: '', year: 0, info:'', imgVinylUrl: null, comments:[], likes:[], likeSelected: false, error: null }


    componentDidMount() {

        console.log('did ' + this.state.likeSelected) 
        
        try {
            logic.retrieveVinylById(this.props.id)
            .then(vinyl => this.setState({ title: vinyl.title, artist: vinyl.artist, year: vinyl.year, info: vinyl.info, imgVinylUrl: vinyl.imgVinylUrl, comments: vinyl.comments, likes: vinyl.likes  }))
            .catch(err => this.setState({ error: err.message }))
            logic.itsInLikes(this.props.id)        
            .then(res => this.setState ({ likeSelected: res }))
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleLikeClick = e => {
  
        e.preventDefault()
             try {       
            
                logic.addLike(this.props.id)
                .then(() => {
                    logic.retrieveVinylById(this.props.id)
                    .then(vinyl => this.setState({ title: vinyl.title, artist: vinyl.artist, year: vinyl.year, info: vinyl.info, imgVinylUrl: vinyl.imgVinylUrl, comments: vinyl.comments, likes: vinyl.likes, likeSelected: true }))
                })
                .catch(err => this.setState({ error: err.message }))
            } catch (err) {
                this.setState({ error: err.message })
            }
    }


    handleDontLikeClick = e => {
        e.preventDefault()

             try {       
            
                logic.removeLike(this.props.id)
                .then(() => {
                    logic.retrieveVinylById(this.props.id)
                    .then(vinyl => { this.setState({ title: vinyl.title, artist: vinyl.artist, year: vinyl.year, info: vinyl.info, imgVinylUrl: vinyl.imgVinylUrl, comments: vinyl.comments, likes: vinyl.likes, likeSelected: false }) })
                })
                .catch(err => this.setState({ error: err.message }))
            } catch (err) {
                this.setState({ error: err.message })
            }
    }



    render() {

        const {error, imgVinylUrl, artist, title, year, info, likeSelected, likes } = this.state

        console.log(likeSelected + ' render')
        

        return  <div className='vinyl-container'>
                    <img className='vinyl-img'  src={imgVinylUrl ? imgVinylUrl : './img/vinyl.png'} ></img>
                    <br></br>
                    <p className='likes'> {likes.length}</p>
                    <a href="#" onClick={likeSelected ? this.handleDontLikeClick : this.handleLikeClick}> {likeSelected ? <span className='dont-like-btn'><i className='fa fa-star'>dont like</i></span> : <span className='like-btn'><i className='fas fa-star'>add like</i></span>}</a>
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