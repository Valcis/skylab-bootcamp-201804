import React, { Component } from 'react';
import './home.css'
import logic from '../logic'
import swal from 'sweetalert2'
import Header from './Header'
import Button from './Button';
import { Col, Input, Form, FormGroup, Label } from 'reactstrap';

class RegisterPage extends Component {

  state = {
    // subscribeDate and permission are setted  by default
    // comments and likes ¿?
    user: {
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      confirmpw: '',
      birthdate: '',
      gender: '',
      address: '',
      permission: '',
      comments: '',
      likes: '',

    },
    submitted: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.username && user.password && user.confirmpw) {
      if (user.password === user.confirmpw) {
        const body = {
          "username": user.username,
          "password": user.password,
          "firstname": user.firstName,
          "lastname": user.lastName
        }

        logic.user.registerUser(body).then(data => {
          if (data.status === 'OK') {
            swal({
              text: 'Registered!',
              title: 'Go to login!',
              type: 'success'
            }).then(result => {
              if (result.value) {
                this.props.history.push('/login')
              }
            })
          } else {
            swal({
              type: 'error',
              title: 'Something went wrong!',
              text: data.error
            })
          }

        })
      } else {
        swal({
          type: 'error',
          title: 'Oops!',
          text: "Those passwords didn't match"
        })
      }
      this.setState({
        user: {
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmpw: ''
        },
        submitted: false
      })
    }
  }


  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div>
        <Header />
        <form name="form" onSubmit={this.handleSubmit}>

          <Input type='text' name='username' helpText='Username is required' labelText='User Name'
            value={user.username} submitted={submitted} handleChange={this.handleChange} />
          <Input type='text' name='email' helpText='Email is required' labelText='Email'
            value={user.email} submitted={submitted} handleChange={this.handleChange} />
          <Input type='password' name='password' helpText='Password is required' labelText='Password'
            value={user.password} submitted={submitted} handleChange={this.handleChange} />
          <Input type='password' name='confirmpw' helpText='Password is required' labelText='Confirm password'
            value={user.confirmpw} submitted={submitted} handleChange={this.handleChange} />
          <Input type='text' name='name' helpText='First Name is required' labelText='Name'
            value={user.name} submitted={submitted} handleChange={this.handleChange} />
          <Input type='text' name='surname' helpText='SurName is required' labelText='SurName'
            value={user.surname} submitted={submitted} handleChange={this.handleChange} /><br /><br /><br />
          <Input type='date' name='birthdate' helpText='Birthdate is required' labelText='Birthdate'
            value={user.birthdate} submitted={submitted} handleChange={this.handleChange} />

          <div >
            <input type='radio' value='male' name='gender' /> Male
            <input type='radio' value='female' name='gender' /> Female
          </div>

          <Input type='radio' name='gender' helpText=' is required' labelText='Male'
            value='male' submitted={submitted} handleChange={this.handleChange} />
          <Input type='radio' name='gender' helpText=' is required' labelText='Female'
            value='female' submitted={submitted} handleChange={this.handleChange} />

          <Input type='text' name='adderss' helpText='Adderss is required' labelText='Adderss'
            value={user.adderss} submitted={submitted} handleChange={this.handleChange} />

          <Button name='Subscribe' destination='' namelink='' condition={registering} />


          
        </form>
      </div>
    )
  }


}
export default RegisterPage;