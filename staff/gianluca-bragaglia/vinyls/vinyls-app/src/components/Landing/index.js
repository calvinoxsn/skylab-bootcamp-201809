import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'mdbreact'
import  './landing.css'

function Landing(props) {

    return <section className='container-landing'>
        
        <div className='container-landing-right'>

            <h1 className='landing-title'>Vinyls</h1>

            <Link to={'./register'} ><Button color='black darken-4'>Register</Button></Link>
            
            {/* <Button color="black darken-4" onClick={props.onRegisterClick}>Register</Button> */}

            <Link to={'./login'}><Button color='black darken-4'>Login</Button> </Link>

            {/* <Button color="unique" onClick={props.onLoginClick}>Login</Button>   */}   

        </div>
        
    </section>
}

export default Landing
