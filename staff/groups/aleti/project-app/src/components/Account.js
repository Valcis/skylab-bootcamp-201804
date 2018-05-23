import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logic from '../logic/userLogic'
import swal from 'sweetalert2'
import InputUser from './InputUser';
import ButtonInput from './ButtonInput';
import {withRouter} from 'react-router-dom'
import './Account.css';

class Account extends Component {

    state = {
        user: {
            username: '',
            password: '',
            new_password: '',
            conf_password: '',
            new_username: '',
            bio: '',
            location: ''
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
        logic.retrieveUser(localStorage.getItem('id'), localStorage.getItem("token"))
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

    /* handleSubmit = (event) => { } */

    handleChangePass = (event) => {
        event.preventDefault()
        
        let old_pass = this.state.user.password
        let new_pass = this.state.user.new_password
        let conf_pass = this.state.user.conf_password

        let body = {
            username: this.state.user.username,
            password: this.state.user.password,
        }
        console.log("body en account : ", body)
        if (new_pass === conf_pass) {
            logic.loginUser(body)
                .then(res => {
                    if (res.status === 'OK') {
                        body = {
                            ...body,
                            newPassword : new_pass
                        }
                        logic.updateUser(body, localStorage.getItem('id'), localStorage.getItem('token'))
                        this.setState({
                            user: {
                                ...this.user,
                                password: '',
                                new_password: '',
                                conf_password:''
                            }
                        });
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
        } else {
            swal({
                type: 'error',
                title: 'nueva password no confirmada',
                text: '',
            })
        }


    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>Account</h3>
                <form name="form" onSubmit={this.handleChangePass}>
                    <fieldset>
                        <legend><h3>Change Password</h3></legend>
                        <InputUser type='password' name='password' helpText='' labelText='Old password :'
                            value={user.password} submitted={submitted} handleChange={this.handleChange} />
                        <InputUser type='password' name='new_password' helpText='' labelText='New password :'
                            value={user.new_password} submitted={submitted} handleChange={this.handleChange} />
                        <InputUser type='password' name='conf_password' helpText='' labelText='Confirm new password :'
                            value={user.conf_password} submitted={submitted} handleChange={this.handleChange} />
                        <ButtonInput name='Update' destination='profile/account' nameLink='' condition={false/* registering */} />
                    </fieldset>
                </form>
                <form name="form2" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend><h3>Change Username</h3></legend>
                        <p>Changing your username can have unintended side effects</p>
                        <InputUser type='text' name='username' helpText='' labelText='Your user name :'
                            value={user.username} submitted={submitted} handleChange={this.handleChange} disabled />
                        <InputUser type='text' name='new_username' helpText='' labelText='New user name :'
                            value={user.new_username} submitted={submitted} handleChange={this.handleChange} />
                        <ButtonInput name='Change Username' destination='profile/account' nameLink='' condition={false/* registering */} />
                    </fieldset>
                </form>
                <form name="form3" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend><h3>Delete Account</h3></legend>
                        <span>Once you delete your account, there is no going back. Please be certain.<br /></span>
                        <ButtonInput name='Delete Account' destination='profile/account' nameLink='' condition={false} />
                    </fieldset>

                </form>
                
            </div>
        );
    }
}


export default withRouter(Account)