import React, { Component } from 'react'
import VinylsList from '../VinylsList'
import UsersGallery from '../UsersGallery'


class Index extends Component {

    render() { 
        return (  <div>
            
                    <UsersGallery></UsersGallery>
                    <VinylsList></VinylsList>
                  </div>
           
         )
    }
}


 
export default Index
