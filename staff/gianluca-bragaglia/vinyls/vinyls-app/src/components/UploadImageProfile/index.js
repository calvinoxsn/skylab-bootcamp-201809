import React, {Component} from 'react'
import { Button } from 'mdbreact'
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

        {/* <input type="file" className='inputfile' name="pic" accept="image/*" onChange={this.fileChangedHandler}></input> */}
        <br></br>
        <div className='img-load-container'>
            <img src={this.state.previewPicture} alt='' className='picture__preview'/>
        </div>
        <br></br>
        <Button type='submit' color='black' className='upload-btn' >Upload Image</Button>
        </form>
    </div>

       )
   }

}

export default UploadImgProfile