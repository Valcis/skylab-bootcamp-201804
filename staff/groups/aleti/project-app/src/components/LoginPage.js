import React, { Component } from 'react';
import logic from '../logic'
import swal from 'sweetalert2'
import InputUser from './InputUser';
import ButtonInput from './ButtonInput';
import Clap from 'react-clap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Grid, Row, Col, Thumbnail } from 'react-bootstrap'
import { FormGroup, FormControl } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import {withRouter} from 'react-router-dom'

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });

        const { username, password } = this.state;
        if (username && password) {
            const body = { "username": username, "password": password }
            logic.user.loginUser(body).then(result => {

                if (result.status === 'OK') {

                    this.storageUserData(result)
                    localStorage.setItem('password', password)
                } else {

                    swal({
                        type: 'error',
                        title: 'Something went wrong!',
                        text: result.error
                    })

                }
            })
            this.setState({
                username: '',
                password: '',
                submitted: false
            })
        }
    }

    storageUserData(result) {

        localStorage.setItem('token', result.data.token)
        localStorage.setItem('id', result.data.id)

        logic.user.retrieveUser(result.data.id, result.data.token)
        .then(res => {
            if (res.status === 'OK') {
                localStorage.setItem('userName', res.data.username)
                this.props.history.push('/')
            }
        })

    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <InputUser type='text' name='username' helpText='Username is required' labelText='Username'
                        value={username} submitted={submitted} handleChange={this.handleChange} />
                    <InputUser type='password' name='password' helpText='Password is required' labelText='Password'
                        value={password} submitted={submitted} handleChange={this.handleChange} />
                    <ButtonInput name='Login' destination='register' nameLink='Register' condition={loggingIn}/>
                </form>
            </div>
        );
    }
}


export default withRouter(LoginPage)