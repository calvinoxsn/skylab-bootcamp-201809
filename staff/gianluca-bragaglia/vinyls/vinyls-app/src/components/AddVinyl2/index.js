import React from 'react'
import { Link } from 'react-router-dom'
import UploadImgVinyl from '../UploadImgVinyl'



const AddVinyl2 = (props) => {
  return (
        <div className='edit-profile1-container'>            
            <h3>Add Vinyl Image</h3>
            <UploadImgVinyl id={props.id}/>
            <Link to={`/index`} ><span className='edit-next-btn'>Skip</span></Link> 
        </div>
  )
}

export default AddVinyl2
