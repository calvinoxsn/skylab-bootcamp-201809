import React, { Component } from 'react'
import VinylsList from '../VinylsList'
import UsersGallery from '../UsersGallery'
import { Link } from 'react-router-dom'


class Index extends Component {

    render() { 
        return (  <div>

                    <UsersGallery></UsersGallery>
                    <Link to='/add-vinyl'><button>add vinyl</button></Link>
                    <VinylsList></VinylsList>
                  </div>
           
         )
    }
}


 
export default Index
