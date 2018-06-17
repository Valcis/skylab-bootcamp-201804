import React, { Component } from 'react';
import api from '../logic'
import swal from 'sweetalert2'

import Button from './Button';
import './UpdateUser.css';
import { withRouter } from 'react-router-dom'
import { Col, Input, Form, FormGroup, Label } from 'reactstrap';

class UpdateUser extends Component {

  state = {
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
  };

  handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  componentDidMount = () => {
    api.retrieveUser(localStorage.getItem('id'), localStorage.getItem("token"))
      .then(data => {
        if (data.status === 'OK') {
          const { name, value } = data;
          this.setState({
            user: {
              ...data.data,
              [name]: value
            }
          })
        } else {
          throw Error("wrong token")
        }
      });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    swal({
      title: 'Login to confirm',
      html:
        `<label>username : </label>` +
        `<input id="username" class="swal2-input" value="">` +
        `<label>password : </label>` +
        `<input type="password" id="password" class="swal2-input" value="">`,
      showCancelButton: true,
      backdrop: "rgba(44, 50, 55, 0.92)",
      focusConfirm: false,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return {
          username: document.getElementById('username').value,
          password: document.getElementById('password').value
        }
      },
      allowOutsideClick: () => !swal.isLoading()
    })
      .then(res => {
        this.setState({
          user: {
            ...this.state.user,
            password: res.value.password,
            username: res.value.username,
          }
        })
        api.loginUser(res.value)
          .then(res => {
            if (res.status === 'OK') {
              api.updateUser(this.state.user, localStorage.getItem('id'), localStorage.getItem('token'))
              swal({
                text: 'Success!',
                title: 'Update was done',
                type: 'success'
              })
            } else {
              swal({
                type: 'error',
                title: 'Something went wrong!',
                text: '',
              })
            }
          })
      })
      .catch(swal.noop);
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3" >
        <h3>Public Profile</h3>
        <form name="form" onSubmit={this.handleSubmit} >
          <Input type='text' name='firstname' helpText='First Name is required' labelText='First Name'
            value={user.firstname} submitted={submitted} handleChange={this.handleChange} />
          <Input type='text' name='lastname' helpText='Last Name is required' labelText='Last Name'
            value={user.lastname} submitted={submitted} handleChange={this.handleChange} />
          <Input type='text' name='email' helpText='' labelText='Email'
            value={user.email} submitted={submitted} handleChange={this.handleChange} />
          <Input type='text' name='bio' helpText='' labelText='Short biography'
            value={user.bio} submitted={submitted} handleChange={this.handleChange} />
          <Input type='text' name='location' helpText='' labelText='Location'
            value={user.location} submitted={submitted} handleChange={this.handleChange} />
          <Button name='Update' destination='' nameLink='' condition='false' />
        </form>
      </div>

    );
  }
}


export default withRouter(UpdateUser)