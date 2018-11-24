import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AddComment from  '../AddComment'
import ListComments from  '../ListComments'
import Error from '../Error'
import logic from '../../logic'
import './index.css'



class Vinyl extends Component {
    state = { title: '', artist: '', year: 0, info:'', imgVinylUrl: null, comments:[], likes:[], likeSelected: false, text:'', error: null, addComment: null }


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
                .then(vinyl => { this.setState({ title: vinyl.title, artist: vinyl.artist, year: vinyl.year, info: vinyl.info, imgVinylUrl: vinyl.imgVinylUrl, comments: vinyl.comments, likes: vinyl.likes, addComment: null}) })
                logic.retrieveComments(this.props.id)
                    .then(comments => { this.setState({ comments }) })
                    .catch(err => this.setState({ error: err.message }))
            })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }


    handleaddCmtBtn = () => {

        if(this.state.addComment == false) {
            
            this.setState({ addComment: true })
        }else{
            this.setState({ addComment: false })
        }

        
    }

    handleSubmit = () => {
        
        const { text } = this.state

        this.handleAddComment( text )

    }



    render() {

        const {error, imgVinylUrl, artist, title, year, info, likeSelected, likes, addComment } = this.state

        return  <div className='vinyl-container'>
                    <img className='vinyl-img'  src={imgVinylUrl ? imgVinylUrl : './img/vinyl.png'} ></img>
                    {error && <Error message={error} />}
                    <p className='vinyl-title'>{title}</p>
                    <p className='vinyl-artist'>{artist}</p>
                    <p className='vinyl-year'>{year}</p>
                    <a href="#" onClick={likeSelected ? this.handleDontLikeClick : this.handleLikeClick}> {likeSelected ? <span className='dont-like-btn'><i className='fa fa-star'><span className='likes-count'>{likes.length}</span></i></span> : <span className='like-btn'><i className='far fa-star'><span className='likes-count'>{likes.length}</span></i></span>}</a>
                    <p className='vinyl-info'>{info}</p>
                    <div className='msg-button'>
                        <span><i className="far fa-comment-alt"></i></span>
                        <a onClick={this.handleaddCmtBtn}><p className='add-comment-icon-text'>Add Comment</p></a>
                    </div>
                    {addComment ? <AddComment onAddComment={this.handleAddComment} /> : null }
                    <ListComments id={this.props.id} />   
                </div>
    }
}

export default withRouter(Vinyl)