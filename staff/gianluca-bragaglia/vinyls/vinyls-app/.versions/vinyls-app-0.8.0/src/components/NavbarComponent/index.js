import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem } from 'mdbreact'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import './index.css'
import Event from '../../plugins/bus'

class NavbarComponent extends Component {

    state = {collapse: false, isWideEnough: false, username: '', imgProfileUrl: null, error:null}


    componentDidMount() {
        try {       
            
            logic.getCurrentUser()
            .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, error:null  }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
        Event.$on('change-profile-img', ({image}) => this.setState({...this.state, imgProfileUrl: image}))
        Event.$on('change-profile-username', ({username}) => this.setState({...this.state, username: username}))
        
    }


   onClickNav = () => this.setState({ collapse: !this.state.collapse, error: null })

   goToProfile = () => {
        this.setState({error: null})
        this.props.history.push('/profile')
    }

   goToSearchUsers = () => {
        this.setState({error: null})
        this.props.history.push('/users')
    } 

    goToSearchVinyls = () => {
        this.setState({error: null})
        this.props.history.push('/vinyls')
    }

   goToIndex = () => {
        this.setState({error: null})
       this.props.history.push('/index')
    } 
    
   render() {
       const { username, imgProfileUrl } = this.state
       
    
       return (
           <Navbar color="black darken-4" dark expand="md"  scrolling>

               <NavbarBrand >

                   <a onClick = { this.goToIndex } ><strong>Vinyls</strong></a>

               </NavbarBrand>

               { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClickNav } />}

               <Collapse isOpen = { this.state.collapse } navbar>

                   <NavbarNav right>

                        <NavItem className='icon-logout' onClick = { this.goToSearchVinyls  } >

                            <a className="nav-link waves-effect waves-light" ><i className="fas fa-compact-disc"></i></a>

                        </NavItem>

                        <NavItem className='icon-users' onClick = { this.goToSearchUsers } >

                            <a className="nav-link waves-effect waves-light search"  ><i className="fas fa-users"></i></a>

                        </NavItem >

                       <NavItem onClick = { this.goToProfile } >

                           <a className="nav-link waves-effect waves-light"  ><img className='img-profile-small' src={imgProfileUrl ? imgProfileUrl : './img/icon-profile.png'} ></img> <span className='user-name-navbar' >{username}</span></a>

                       </NavItem >

                       <NavItem className='icon-logout'  onClick = { this.props.onLogout } >

                           <a className="nav-link waves-effect waves-light"><i className="fa fa-sign-out"></i></a>

                       </NavItem>

                   </NavbarNav>

               </Collapse>

           </Navbar>
           
       )
   }
}

export default withRouter(NavbarComponent)

