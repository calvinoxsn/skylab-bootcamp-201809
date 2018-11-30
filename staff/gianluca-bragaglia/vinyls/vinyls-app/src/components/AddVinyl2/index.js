import React from 'react'
import UploadImgVinyl from '../UploadImgVinyl'



const AddVinyl2 = (props) => {
  return (
        <div className='edit-profile1-container'>            
            <h3>Add Vinyl Image</h3>
            <UploadImgVinyl id={props.id}/>
            
        </div>
  )
}

export default AddVinyl2
