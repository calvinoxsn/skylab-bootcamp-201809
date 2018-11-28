import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UploadImgProfile from '../UploadImageProfile'
import './index.css'




class EditProfile1 extends Component {


    render() {

        return <div className='edit-profile1-container'>
               
                <h3>Change Profile Image</h3>
                <UploadImgProfile></UploadImgProfile>
                <Link to={`/edit-profile2`} ><span className='edit-next-btn'>Next</span></Link>
  
        </div>
    }
}

export default EditProfile1