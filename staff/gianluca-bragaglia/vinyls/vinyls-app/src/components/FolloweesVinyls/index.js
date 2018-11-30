import React, { Component } from 'react'
import VinylListCardItem from '../VinylListCardItem'
import logic from '../../logic'




class FolloweesVinyls extends Component {

    state = { followeesVinyls: [], error: null}
    
    componentDidMount() {

        try {              
            logic.retrieveFolloweesListVinyls()
            .then(followeesVinyls => { this.setState({ followeesVinyls }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
    render() { 

        const { followeesVinyls } = this.state

        const _followeesVinyls = followeesVinyls.reverse()
        
        return ( 
            <React.Fragment>

                <h2 className='text-center my-5'>Followees Vinyls</h2> 
                
                <div className='list-card'>
                        {_followeesVinyls.map(vinyl => (
                            <VinylListCardItem key={vinyl.idVinyl} id={vinyl.idVinyl} userId={vinyl.id} title={vinyl.title} artist={vinyl.artist} img={vinyl.imgVinylUrl} comments={vinyl.comments.length} likes={vinyl.likes.length} year={vinyl.year}/>
                        ))}
                </div>

            </React.Fragment>
         )
    }
}

 
export default FolloweesVinyls