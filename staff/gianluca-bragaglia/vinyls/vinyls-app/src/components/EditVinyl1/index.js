import React from 'react'
import { Link } from 'react-router-dom'
import UploadImgVinyl from '../UploadImgVinyl'



const EditVinyl1 = (props) => {
  return (
        <div className='edit-profile1-container'>
               
                <h3>Change Vinyl Image</h3>
                <UploadImgVinyl id={props.id}/>
                <Link to={`/vinyl/${props.id}/edit2`} ><span className='edit-next-btn'>Next</span></Link>
  
        </div>
  )
}

export default EditVinyl1
