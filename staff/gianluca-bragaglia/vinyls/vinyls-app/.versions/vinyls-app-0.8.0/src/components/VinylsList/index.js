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

        const _vinyls = vinyls.reverse()
        
        return ( 
            <React.Fragment>
                
                <div className='list-card'>
                        {_vinyls.map(vinyl => (
                            <VinylListCardItem key={vinyl.idVinyl} id={vinyl.idVinyl} userId={vinyl.id} title={vinyl.title} artist={vinyl.artist} img={vinyl.imgVinylUrl} comments={vinyl.comments.length} likes={vinyl.likes.length} year={vinyl.year}/>
                        ))}
                </div>
                {/* <div className='vinyls-list'>
                        <ul className='list-group-flush'>
                        {vinyls.map(vinyl => (
                            <VinylsListItem key={vinyl.idVinyl} id={vinyl.idVinyl} userId={vinyl.id} title={vinyl.title} artist={vinyl.artist} img={vinyl.imgVinylUrl}/>
                        ))}
                        </ul>
                </div>  */}
            </React.Fragment>
         )
    }
}

 
export default VinylsList