import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UploadImgVinyl from '../UploadImgVinyl'
//import './index.css'




class EditVinyl1 extends Component {


    render() {

        return <div className='edit-profile1-container'>
               
                <h3>Change Vinyl Image</h3>
                <UploadImgVinyl id={this.props.id}/>
                <Link to={`/vinyl/${this.props.id}/edit2`} ><span className='edit-next-btn'>Next</span></Link>
  
        </div>
    }
}

export default EditVinyl1