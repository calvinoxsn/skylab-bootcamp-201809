import React, {Component} from 'react'
import { Button } from 'mdbreact'
import { Link } from 'react-router-dom'
import logic from '../../logic'


class UploadImgVinyl extends Component {
    state={ picture: null, previewPicture: null}

  
    handleUploadImgVinyl = e => {
        e.preventDefault()
        
        try {
            logic.uploadImgVinyl(this.state.picture, this.props.id)
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
        <form encType="multipart/form-data" onSubmit={this.handleUploadImgVinyl}>

        <div class="file-input-wrapper">
            <button class="btn-file-input">Select Image</button>
            <input type="file" type="file" className='inputfile' name="pic" accept="image/*" onChange={this.fileChangedHandler} />
        </div>
        <br></br>
        { this.state.previewPicture && <div className='img-load-container'>
            <img src={this.state.previewPicture} alt='' className='picture__preview'/>
        </div>}
        <br></br>
        <Button type='submit' color='black' className='upload-btn' >Upload Image</Button>
        </form>
         <Link to={`/index`} ><span className='edit-next-btn'>Save</span></Link> 
    </div>

       )
   }

}

export default UploadImgVinyl