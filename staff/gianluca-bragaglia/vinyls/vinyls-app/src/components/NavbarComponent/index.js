import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem } from 'mdbreact'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import './navbarComponent.css'
import Event from '../../plugins/bus'

// Redux
// import { connect } from 'react-redux'
// import { getCurrentUser } from '../../actions/usersActions'


class NavbarComponent extends Component {

    state = {collapse: false, isWideEnough: false, username: '', imgProfileUrl: null, bio: ''}


    componentDidMount() {
        try {       
            
            logic.getCurrentUser()
            .then(user => { this.setState({ username: user.username, imgProfileUrl: user.imgProfileUrl, bio: user.bio  }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
        Event.$on('change-profile-img', ({image}) => this.setState({...this.state, imgProfileUrl: image}))
        Event.$on('change-profile-username', ({username}) => this.setState({...this.state, username: username}))
        
    }


   onClickNav = () => this.setState({ collapse: !this.state.collapse })

   goToProfile = () => this.props.history.push('/profile') 

   goToIndex = () => this.props.history.push('/index') 
    
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

                       <NavItem onClick = { this.goToProfile } >

                           <a className="nav-link waves-effect waves-light"  ><img className='img-profile-small' src={imgProfileUrl ? imgProfileUrl : './img/icon-profile.png'} ></img> {username}</a>

                       </NavItem >

                       <NavItem>

                           <a className="nav-link waves-effect waves-light" onClick = { this.props.onLogout }><i className="fa fa-sign-out"></i> Logout</a>

                       </NavItem>

                   </NavbarNav>

               </Collapse>

           </Navbar>
           
       )
   }
}

// state
// const mapStateToProps = state => {

//     let result = {}
//     if(state.user.profile.data){
//     result =  {
//       username: state.user.profile.data.username}   
//     }
//   return result
    
// }
  
    
 
export default withRouter(NavbarComponent)

