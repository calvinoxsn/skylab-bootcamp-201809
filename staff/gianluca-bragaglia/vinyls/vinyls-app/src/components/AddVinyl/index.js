import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'mdbreact'
import Error from '../Error'
import logic from '../../logic'
//import './index.css'



class AddVinyl extends Component {
    state = { title: '', artist: '', year: '', info:'', imgVinylUrl: null, error: null }


    // componentDidMount() {
    //     try {
    //         logic.retrieveVinyl()
    //         .then(vinyl => { this.setState({ title: vinyl.title, artist: vinyl.artist, year: vinyl.year, info: vinyl.info, imgVinylUrl: vinyl.imgVinylUrl  }) })
    //         .catch(err => this.setState({ error: err.message }))
    //     } catch (err) {
    //         this.setState({ error: err.message })
    //     }
    // }

    handleTitleChange = event => {
        const title = event.target.value

        this.setState({ title })
    }

    handleArtistChange = event => {
        const artist = event.target.value

        this.setState({ artist })
    }

    handleYearChange = event => {
        const year = event.target.value

        this.setState({ year })
    }

    handleInfoChange = event => {
        const info = event.target.value

        this.setState({ info })
    }

    handleimgVinylUrlChange = event => {
        const imgVinylUrl = event.target.value

        this.setState({ imgVinylUrl })
    }


    uploadWidget =() => {

        let widget = window.cloudinary.openUploadWidget({ cloud_name: 'dmp64syaz', upload_preset: 'pd0ikih0'},
            (error, result) => {
               

                if (result.event === 'success') {

                    const imgVinylUrl = result.info.secure_url

                    this.setState({ imgVinylUrl })
                    
                    widget.close()

                }
            })
            
    }

    handleSubmit = event => {

        event.preventDefault()

        const { title, artist, year, imgVinylUrl, info } = this.state

        this.handleAddVinyl(title, artist, year, imgVinylUrl, info)

        console.log('handlesubmit')

        //this.setState({error: null})
     
    }


    handleAddVinyl = ( title, artist, year, imgVinylUrl, info ) => {
       
        
        try {
            logic.addVinyl( title, artist, year, imgVinylUrl, info )
                .then(() => {
                    this.setState({ error: null })
                    // , () => this.props.history.push('/index')
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }        

    render() {

        const {error, imgVinylUrl } = this.state

        return <div className='edit-profile-container'>
                <img className='profile-img' src={imgVinylUrl ? imgVinylUrl : './img/vinyl.png'} ></img>
                <br></br>
                <Button type='button' onClick={this.uploadWidget} color='black' >Upload Image</Button>
                {error && <Error message={error} />}
                <form className='form-edit-profile' onSubmit={this.handleSubmit}>
                    <br></br>
                    <input className='input' type='text' placeholder='title' onChange={this.handleTitleChange} />
                    <br></br>
                    <input className='input' type='text' placeholder='artist' onChange={this.handleArtistChange} />
                    <br></br>
                    <input className='input' type='text'  placeholder='year' onChange={this.handleYearChange} />
                    <br></br>
                    <textarea className='textarea' type='text' placeholder='info' onChange={this.handleInfoChange} />                   
                    <br></br>
                    <Button type='submit'color='black' >Save</Button> 
                </form>
        </div>
    }
}

export default withRouter(AddVinyl)