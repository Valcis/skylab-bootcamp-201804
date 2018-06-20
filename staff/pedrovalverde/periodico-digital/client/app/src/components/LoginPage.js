import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert2'
import Header from './Header'
import Button from './Button'
import logic from '../logic/'

import { Col, Input, Form, FormGroup, Label } from 'reactstrap';



class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    submitted: false,
  }


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });

    const { email, password } = this.state;
    console.log("email", email)
    if (email && password) {
      const body = { "email": email, "password": password }
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
        email: '',
        password: '',
        submitted: false
      })
    }
  }

  storageUserData = (result) => {

    localStorage.setItem('token', result.data.token)
    localStorage.setItem('id', result.data.id)

    logic.user.retrieveUser(result.data.id, result.data.token)
      .then(res => {
        if (res.status === 'OK') {
          localStorage.setItem('email', res.data.email)
          this.props.history.push('/')
        }
      })

  }

  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <div>
      <Header />
      <Form name="form" onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <FormGroup row>
          <Label for='email' sm={3}>email</Label>
          <Col sm={5}>
            <Input type='text' id='email' name='email' helpText='email is required' labelText='Email'
              value={email} submitted={submitted} placeholder="set your email" onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3}>Password</Label>
          <Col sm={5}>
            <Input type='password' name='password' helpText='Password is required' labelText='Password'
              value={password} submitted={submitted} placeholder="password placeholder" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <Button name='Login' destination='register' nameLink='Register' condition={loggingIn} />
      </Form>
      </div>
    );
  }
}


export default withRouter(LoginPage)

