import React, { Component } from 'react'
import Comment from '../Comment'
import './index.css'



class CommentsList extends Component {

   
    render() { 

        const { comments } = this.props
     
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

 
export default CommentsList