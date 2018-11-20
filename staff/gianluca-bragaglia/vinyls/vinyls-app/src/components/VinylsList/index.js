import React, { Component } from 'react'
import VinylsListItem from '../VinylsListItem'
import VinylListCardItem from '../VinylListCardItem'
import logic from '../../logic'
import './index.css'



class VinylsList extends Component {

    state = { vinyls: [], error: null}
    
    componentDidMount() {

        try {              
            logic.retrieveVinyls()
            .then(vinyls => { this.setState({ vinyls }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
    render() { 

        const { vinyls } = this.state
        
        return ( 
            <React.Fragment>
                 <h2 className='text-center my-5'>Vinyls</h2> 
                
                {/* <div className='list-card'>
                        {vinyls.map(vinyl => (
                            <VinylListCardItem key={vinyl.id} info={vinyl}/>
                        ))}
                </div>*/}
                <div className='vinyls-list'>
                        <ul className='list-group-flush'>
                        {vinyls.map(vinyl => (
                            <VinylsListItem key={vinyl.idVinyl} id={vinyl.idVinyl} userId={vinyl.id} title={vinyl.title} artist={vinyl.artist} img={vinyl.imgVinylUrl}/>
                        ))}
                        </ul>
                </div> 
            </React.Fragment>
         )
    }
}

 
export default VinylsList