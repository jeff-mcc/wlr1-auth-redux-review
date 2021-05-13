import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {saveUser,logoutUser} from '../redux/authReducer'

class Auth extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // to handle errors with async you can't use .catch so instead you use a try{axios call}catch{error handling} wrapped around
    // .... or just use a .then().catch and don't use async
    handleLogin = async () => {
        const res = await axios.post('/auth/login',{email: this.state.email, password: this.state.password})
        this.props.saveUser(res.data)
    }

    handleRegister = async () =>{
        const res = await axios.post('/auth/register',{email: this.state.email, password: this.state.password})
        this.props.saveUser(res.data)
    }

    handleLogout = async () =>{
        await axios.get('/auth/logout')
        this.props.logoutUser()
    }

    render(){
        const {email, password} = this.state;
        return(
            <div>
                <button onClick={this.handleLogout}>Logout</button>
                <input name="email" value={email} onChange={this.handleChange} />
                <input name="password" value={password} onChange={this.handleChange} />
                <button onClick={this.handleLogin}>Login</button>
                <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }
}

export default connect(null, {saveUser,logoutUser})(Auth)