import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'mdbreact'
import Error from '../Error'
import logic from '../../logic'
import { number } from 'prop-types';
//import './index.css'



class AddVinyl extends Component {
    state = { title: '', artist: '', year: null, info:'', imgVinylUrl: null, error: null }


    // componentDidMount() {
    //     try {
    //         logic.retrieveVinyl()
    //         .then(vinyl => { this.setState({ title: vinyl.title, artist: vinyl.artist, year: vinyl.year, info: vinyl.info, imgVinylUrl: vinyl.imgVinylUrl  }) })
    //         .catch(err => this.setState({ error: err.message }))
    //     } catch (err) {
    //         this.setState({ error: err.message })
    //     }
    // }

    handleTitleChange = e => {
        const title = e.target.value

        this.setState({ title })
    }

    handleArtistChange = e => {
        const artist = e.target.value

        this.setState({ artist })
    }

    handleYearChange = e => {
        const yearValue = e.target.value

        const year = parseInt(yearValue)

        this.setState({ year })
    }

    handleInfoChange = e => {
        const info = e.target.value

        this.setState({ info })
    }

    handleimgVinylUrlChange = e => {
        const imgVinylUrl = e.target.value
     
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

    handleSubmit = e => {

        e.preventDefault()

        const { title, artist, year, imgVinylUrl, info } = this.state


        try {
            logic.addVinyl( title, artist, year, imgVinylUrl, info )
                .then(() => {
                    this.setState({ error: null }, () => this.props.history.push('/index'))
                    // , () => this.props.history.push('/index')
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
     
    }


    // handleAddVinyl = ( title, artist, year, imgVinylUrl, info ) => {     
    //     console.log(title, artist, year, imgVinylUrl, info + 'handleaddviynl')
    //     try {
    //         logic.addVinyl( title, artist, year, imgVinylUrl, info )
    //             .then(() => {
    //                 this.setState({ error: null }, () => this.props.history.push('/index'))
    //                 // , () => this.props.history.push('/index')
    //             })
    //             .catch(err => this.setState({ error: err.message }))
    //     } catch (err) {
    //         this.setState({ error: err.message })
    //     }
    // }        

    render() {

        const {error, imgVinylUrl, info } = this.state

        return <div className='edit-profile-container'>
                <img className='profile-img'  src={imgVinylUrl ? imgVinylUrl : './img/vinyl.png'} ></img>
                <br></br>
                {error && <Error message={error} />}
                <Button type='button' onClick={this.uploadWidget} color='black' >Upload Image</Button>
                <form className='form-edit-profile' onSubmit={this.handleSubmit}>
                    <br></br>
                    <input className='input' type='text' placeholder='title' onChange={this.handleTitleChange} />
                    <br></br>
                    <input className='input' type='text' placeholder='artist' onChange={this.handleArtistChange} />
                    <br></br>
                    <input className='input' type='text'  placeholder='year' onChange={this.handleYearChange} />
                    <br></br>
                    <textarea className='textarea' type='text' value={info} placeholder='info' onChange={this.handleInfoChange} />                   
                    <br></br>
                    <Button type='submit'color='black' >Save</Button> 
                </form>
        </div>
    }
}

export default withRouter(AddVinyl)