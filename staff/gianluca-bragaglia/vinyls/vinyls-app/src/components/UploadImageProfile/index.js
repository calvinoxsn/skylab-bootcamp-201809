import React, {Component} from 'react'
import { Button } from 'mdbreact'
import { Link } from 'react-router-dom'
import logic from '../../logic'
import './index.css'

class UploadImgProfile extends Component {
    state={ picture: null, previewPicture: null}

  
    handleUploadImgProfile = e => {
        e.preventDefault()
        
        try {
            logic.uploadImgProfile(this.state.picture)
            .then(() => this.setState({previewPicture: null, picture: this.state.picture}))
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }

    }


    fileChangedHandler = event => {
    event.preventDefault()

    this.setState({previewPicture: URL.createObjectURL(event.target.files[0]), picture: event.target.files[0]})
    }


   render() {
       return(   <div>
        <form encType="multipart/form-data" onSubmit={this.handleUploadImgProfile}>

        <div class="file-input-wrapper">
            <button class="btn-file-input">Select Image</button>
            <input type="file" type="file" className='inputfile' name="pic" accept="image/*" onChange={this.fileChangedHandler} />
        </div>

        <br></br>
        {this.state.previewPicture && <div className='img-load-container'>
            <img src={this.state.previewPicture} alt='' className='picture__preview'/>
        </div>}
        <br></br>
        <Button type='submit' color='black' className='upload-btn' >Upload Image</Button>
        </form>
        { this.state.previewPicture ? <Link to={`/edit-profile2`} ><span className='edit-next-btn'>Next</span></Link> : <Link to={`/edit-profile2`} ><span className='edit-next-btn'>Skip</span></Link>}
    </div>

       )
   }

}

export default UploadImgProfile