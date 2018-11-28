import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UploadImgVinyl from '../UploadImgVinyl'
//import './index.css'




class AddVinyl2 extends Component {



    render() {


        return <div className='edit-profile1-container'>
               
                <h3>Add Vinyl Image</h3>
                <UploadImgVinyl id={this.props.id}/>
                {/* <div>
                    <form encType="multipart/form-data" onSubmit={this.handleUploadImgVinyl}>

                    <input type="file" className='inputfile' name="pic" accept="image/*" onChange={this.fileChangedHandler}></input>
                    <br></br>
                    <img src={this.state.previewPicture} alt='' className='picture__preview'/>
                    <br></br>
                    <Button type='submit' color='black' className='upload-btn' >Upload Image</Button>
                    </form>
                </div> */}
               <Link to={`/index`} ><span className='edit-next-btn'>Skip</span></Link> 
        </div>
    }
}

export default AddVinyl2