import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AddComment from  '../AddComment'
import ListComments from  '../ListComments'
import Error from '../Error'
import logic from '../../logic'
import './index.css'



class Vinyl extends Component {
    state = { title: '', artist: '', year: 0, info:'', imgVinylUrl: null, comments:[], likes:[], likeSelected: false, text:'', error: null }


    componentDidMount() {
       
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

    handleAddComment = (text) => {
        
        try {       
            
            logic.addComment(this.props.id, text)
            .then(() => {
                logic.retrieveVinylById(this.props.id)
                .then(vinyl => { this.setState({ title: vinyl.title, artist: vinyl.artist, year: vinyl.year, info: vinyl.info, imgVinylUrl: vinyl.imgVinylUrl, comments: vinyl.comments, likes: vinyl.likes}) })
                logic.retrieveComments(this.props.id)
                    .then(comments => { this.setState({ comments }) })
                    .catch(err => this.setState({ error: err.message }))
            })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }


    handleTextChange = e => {
        const text = e.target.value

        this.setState({ text })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const { text } = this.state

        this.handleAddComment( text )  
    }



    render() {

        

        const {error, imgVinylUrl, artist, title, year, info, likeSelected, likes } = this.state

        return  <div className='vinyl-container'>
                    <img className='vinyl-img'  src={imgVinylUrl ? imgVinylUrl : './img/vinyl.png'} ></img>
                    <br></br>
                    <p className='likes-count'> {likes.length}</p>
                    <a href="#" onClick={likeSelected ? this.handleDontLikeClick : this.handleLikeClick}> {likeSelected ? <span className='dont-like-btn'><i className='fa fa-star'></i></span> : <span className='like-btn'><i className='far fa-star'></i></span>}</a>
                    <br></br>
                    {error && <Error message={error} />}
                    <p className='vinyl-title'>{title}</p>
                    <p className='vinyl-artist'>{artist}</p>
                    <p className='vinyl-year'>{year}</p>
                    <p className='vinyl-info'>{info}</p>
                    {/* <AddComment onAddComment={this.handleAddComment}/> */}
                    <form className='form-add-comment' onSubmit={this.handleSubmit}>
                        <input className='input' type='text'  id='comment-text' placeholder='write a comment...' onChange={this.handleTextChange} />
                        <br></br>
                        <button type='submit' className='comment-btn' >submit</button>
                    </form>
                    <ListComments id={this.props.id} />   
                </div>
    }
}

export default withRouter(Vinyl)