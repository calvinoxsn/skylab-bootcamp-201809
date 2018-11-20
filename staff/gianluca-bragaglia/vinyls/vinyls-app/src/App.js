import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from './logic'
import Event from './plugins/bus'
import Index from './components/Index'
import Login from './components/Login'
import Register from './components/Register'
import NavbarComponent from './components/NavbarComponent'
import Landing from './components/Landing'
import Error from './components/Error'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import PublicProfile from './components/PublicProfile'
import FollowsListUser  from './components/FollowsListUser'
import FollowersListUser  from './components/FollowersListUser'
import SearchListUsers from './components/SearchListUsers'
import AddVinyl from './components/AddVinyl'
import VinylsList from './components/VinylsList'
import Vinyl from './components/Vinyl'

logic.url = 'http://localhost:5000/api'

class App extends Component {

    state = { error: null }
   
   
    handleRegister = ( email, username, password, bio ) => {
  
        try {
            logic.registerUser(email, username, password, bio)
                .then(() => {
                    this.setState({ error: null }, () => this.props.history.push('/login'))
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
    
    handleLogin = (username, password) => {
        try {
            logic.login(username, password)
                .then(() =>  {
                this.setState({ error: null }, () => this.props.history.push('/index'))
            })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    
    }

    handleEditProfile = ( username,  newPassword, password, imgProfileUrl, bio ) => {
        
        try {
            logic.modifyUser( username,  newPassword, password, imgProfileUrl, bio )
                .then(() => {
                    this.setState({ error: null }, () => this.props.history.push('/profile'))
                    Event.$emit('change-profile-img', {image: imgProfileUrl})
                    Event.$emit('change-profile-username', {username: username})
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }
    
    handleLogoutClick = () => {
        logic.logout()
        this.props.history.push('/')
    }

    handleGoBack = () =>  {
        this.setState({error: null})
        this.props.history.push('/')
    }
    
    

    render() { 

        const { error } = this.state

        return  <div>
                  {logic.loggedIn && <NavbarComponent onLogout={this.handleLogoutClick}></NavbarComponent>}

                  <Route exact path="/" render={() => !logic.loggedIn ? <Landing onRegisterClick={this.handleRegisterClick} onLoginClick={this.handleLoginClick}/> : <Redirect to="/index" />} /> 
                  <Route path="/register" render={() => !logic.loggedIn ? <Register onRegister={this.handleRegister} onGoBack={this.handleGoBack}  /> : <Redirect to="/index" />} /> 
                  <Route path="/login" render={() => !logic.loggedIn ? <Login onLogin={this.handleLogin} onGoBack={this.handleGoBack}  /> : <Redirect to="/index" />} /> 
                  {error && <Error message={error} />}
                  <Route path="/index" render={() => logic.loggedIn ? <Index onLogin={this.handleLogin}  /> : <Redirect to="/index" />}/> 
                  <Route path="/edit-profile" render={() => logic.loggedIn ? <EditProfile onEditProfile={this.handleEditProfile} /> : <Redirect to="/login" />} />
                  <Route exact path="/profile" render={() => logic.loggedIn ? <Profile /> : <Redirect to="/login" />} />
                  <Route exact path="/profile/:id" render={(props) => logic.loggedIn ? <PublicProfile id={props.match.params.id}/> : <Redirect to="/login" />} />
                  <Route exact path="/follows" render={() => logic.loggedIn ? <FollowsListUser /> : <Redirect to="/login" />} />
                  <Route exact path="/followers" render={() => logic.loggedIn ? <FollowersListUser /> : <Redirect to="/login" />} />
                  <Route exact path="/users" render={() => logic.loggedIn ? <SearchListUsers /> : <Redirect to="/login" />} />
                  <Route path="/add-vinyl" render={() => logic.loggedIn ? <AddVinyl /> : <Redirect to="/login" />} />
                  <Route exact path="/vinyls" render={() => logic.loggedIn ? <VinylsList /> : <Redirect to="/login" />} />
                  <Route exact path="/vinyl/:id" render={() => logic.loggedIn ? <Vinyl /> : <Redirect to="/login" />} />
                </div> 

           
    }
}

export default withRouter (App);

