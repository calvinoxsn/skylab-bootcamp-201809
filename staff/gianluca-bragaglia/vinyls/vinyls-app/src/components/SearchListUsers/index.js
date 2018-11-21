import React, { Component } from 'react'
import logic from '../../logic'
import Error from '../Error'
import UserListItem from '../UserListItem'
import { Input } from 'mdbreact'
import './index.css'



class SearchListUsers extends Component {

    state = {users: [], error: null, search: ''}
    
    componentDidMount() {
       
        try {  
            
            logic.retrieveUsers()
            .then(res => { this.setState({ users: res, error: null  }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    searchUserChange = event => {

        const search = event.target.value

        this.setState({ search })
    }

    render() { 

        const { users, search } = this.state

        let filteredUsers = users.filter(

            (user) => {

                return user.username.indexOf(search) !== -1
            }
        )

        return ( 

            <React.Fragment>
                <h2 className='text-center my-5'>Search Users</h2> 

                <div className='search-user'>
                    <Input label='search' icon='search' type='text' onChange={this.searchUserChange} /> 
                </div>
                
                <div className='list-group-flush'>
                        {filteredUsers.map(user => (
                            <UserListItem key={user.idUser} id={user.idUser} username={user.username} imgProfileUrl={user.imgProfileUrl}/>
                        ))}
                </div>
               
            </React.Fragment>
         )
    }
}

 
export default SearchListUsers