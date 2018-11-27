import React, {Component} from 'react'
import { Button } from 'mdbreact'
import logic from '../../logic'
import './index.css'

class AddPicture extends Component {
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

        <input type="file" className='inputfile' name="pic" accept="image/*" onChange={this.fileChangedHandler}></input>
        <br></br>
        <img src={this.state.previewPicture} alt='' className='picture__preview'/>
        <br></br>
        <Button type='submit' color='black' className='upload-btn' >Upload Image</Button>
        </form>
    </div>

       )
   }

}

export default AddPicture