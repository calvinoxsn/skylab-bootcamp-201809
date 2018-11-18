import React, { Component } from 'react'
import VinylListItem from '../VinylListItem'
import VinylListCardItem from '../VinylListCardItem'
import './index.css'



class VinylsList extends Component {
    
    // componentDidMount() {
    //     this.props.showVinyls()
    // }

    render() { 

        const { vinyls } = this.props
        
        return ( 
            <React.Fragment>
                {/* <h2 className='text-center my-5'>Vinyls</h2> */}
                
                {/* <div className='list-card'>
                        {vinyls.map(vinyl => (
                            <VinylListCardItem key={vinyl.id} info={vinyl}/>
                        ))}
                </div>
                <div className='vinyls-list'>
                        <ul className='list-group-flush'>
                        {vinyls.map(vinyl => (
                            <VinylListItem key={vinyl.id} info={vinyl}/>
                        ))}
                        </ul>
                </div> */}
            </React.Fragment>
         )
    }
}

 
export default VinylsList