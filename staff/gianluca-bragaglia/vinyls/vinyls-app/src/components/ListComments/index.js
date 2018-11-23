import React, { Component } from 'react'
import Comment from '../Comment'
import logic from '../../logic'
import './index.css'



class VinylsList extends Component {

    state = { comments: [] }
    
    componentDidMount() {

        try {              
            logic.retrieveComments(this.props.id)
            .then(comments => { this.setState({ comments }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
    render() { 

        const { comments } = this.state
        console.log(comments)
        
        return ( 
            <React.Fragment>
                <div className='comments-list'>
                        <ul className='list-group-flush'>
                        {comments.map(comment => (
                            <Comment key={comment.idComment}  username={comment.username} text={comment.text}  imgProfile={comment.imgProfileUrl}/>
                        ))}
                        </ul>
                </div> 
            </React.Fragment>
         )
    }
}

 
export default VinylsList