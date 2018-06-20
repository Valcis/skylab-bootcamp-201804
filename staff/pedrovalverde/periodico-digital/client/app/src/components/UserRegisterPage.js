import React, { Component } from 'react';
import './userRegisterPage.css'
import logic from '../logic'
import swal from 'sweetalert2'
import Header from './Header'
import Button from './Button';
import { Col, Input, Form, FormGroup, Label, FormText } from 'reactstrap';


class UserRegisterPage extends Component {
  constructor() {
    super()
  }

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
      permission: 'reader',
      /*comments: '',
      likes: '', */

    },
    submitted: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ submitted: true });
    const { name, surname, email, username, password, confirmpw, birthdate, gender, address } = this.state.user;
    if (name && surname && email && username && password && confirmpw) {
      if (password === confirmpw) {
        logic.user.registerUser(name, surname, email, username, password, birthdate, gender, address, this.state.user.permission)
          .then(data => {
            if (data === true) {
              swal({
                text: 'Registered!',
                title: 'Go to login!',
                type: 'success'
              })
                .then(result => {
                  if (result.value) {
                    //this.props.history.push('/login')
                    window.location = "#/login/"
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
          name: '',
          surname: '',
          email: '',
          username: '',
          password: '',
          confirmpw: '',
          birthdate: '',
          gender: '',
          address: '',
          permission: 'reader',
        },
        submitted: false
      })
    } else {
      swal({
        type: 'error',
        title: 'OOOPS!',
        text: "Some fields are required"
      })
    }
  }


  render() {
    const { user, submitted } = this.state;
    return (
      <div>
        <Header />

        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="username" sm={2}>Username</Label>
            <Col sm={7}>
              <Input type="text" name="username" id="username" value={user.username} placeholder="username" submitted={submitted} onChange={this.handleChange} />
            </Col>
            <Col sm={2}>
              <FormText color="muted" >
                Username is required
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>email</Label>
            <Col sm={7}>
              <Input type="text" name="email" id="email" value={user.email} placeholder="email" submitted={submitted} onChange={this.handleChange} />
            </Col>
            <Col sm={2}>
              <FormText color="muted" >
                email is required
              </FormText>
            </Col>

          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>password</Label>
            <Col sm={7}>
              <Input type="password" name="password" id="password" value={user.password} placeholder="password" submitted={submitted} onChange={this.handleChange} />
            </Col>
            <Col sm={2}>
              <FormText color="muted" >
                password is required
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="confirmpw" sm={2}>Confirm password</Label>
            <Col sm={7}>
              <Input type="password" name="confirmpw" id="confirmpw" value={user.confirmpw} placeholder="password" submitted={submitted} onChange={this.handleChange} />
            </Col>
            <Col sm={2}>
              <FormText color="muted" >
                confirm the pass
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="name" sm={2}>name</Label>
            <Col sm={7}>
              <Input type="text" name="name" id="name" value={user.name} placeholder="name" submitted={submitted} onChange={this.handleChange} />
            </Col>
            <Col sm={2}>
              <FormText color="muted" >
                name is required
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="surname" sm={2}>surname</Label>
            <Col sm={7}>
              <Input type="text" name="surname" id="surname" value={user.surname} placeholder="surname" submitted={submitted} onChange={this.handleChange} />
            </Col>
            <Col sm={2}>
              <FormText color="muted" >
                surname is required
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="birthdate" sm={2}>birthdate</Label>
            <Col sm={7}>
              <Input type="text" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" name="birthdate" id="birthdate" value={user.birthdate} placeholder="yyyy-mm-dd" submitted={submitted} onChange={this.handleChange} />
            </Col>
            <Col sm={2}>
              <FormText color="muted" >
                birthdate is optional
              </FormText>
            </Col>
          </FormGroup>

          <FormGroup row>
            <legend className="col-form-label col-sm-2">Gender</legend>
            <Col sm={7}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" value={user.gender} />{' '}
                  Male
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" value={user.gender} />{' '}
                  Female
              </Label>
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormText color="muted" >
                gender is optional
              </FormText>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="address" sm={2}>address</Label>
            <Col sm={7}>
              <Input type="text" name="address" id="address" value={user.address} placeholder="address" submitted={submitted} onChange={this.handleChange} />
            </Col>
            <Col sm={2}>
              <FormText color="muted" >
                address is optional
              </FormText>
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col sm={{ size: 7, offset: 2 }}>
              <Button name='Subscribe' destination='home' namelink='Cancel' />
            </Col>
          </FormGroup>
        </Form>

      </div>
    )
  }


}
export default UserRegisterPage;