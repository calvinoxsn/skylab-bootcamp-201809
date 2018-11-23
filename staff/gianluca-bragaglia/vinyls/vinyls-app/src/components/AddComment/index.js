import React, { Component } from 'react'
import { Button } from 'mdbreact'
import './index.css'



class AddComment extends Component {

    state = { text:'' }


    handleTextChange = e => {
        const text = e.target.value

        this.setState({ text })
    }

    handleSubmit = () => {
        
        const { text } = this.state

        this.props.onAddComment( text )  
    }

    render() {

        return <div className='add-comment-container'>

                <form className='form-add-comment' onSubmit={this.handleSubmit}>
                    <input className='input' type='text'  id='comment-text' placeholder='write a comment...' onChange={this.handleTextChange} />
                    <br></br>
                    <button type='submit' className='comment-btn' >submit</button>
                </form>
        </div>
    }
}

export default AddComment