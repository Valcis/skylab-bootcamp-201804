import React, { Component } from 'react'
import logic from '../../logic'
import {Link} from 'react-router-dom'
import './index.css'

import swal from 'sweetalert2'

class Login extends Component {

    state = {
        dni: '',
        password: '',
        id:'',
        token:''
    }

    loginDni = (e) => {
        const dni = e.target.value
        this.setState({ dni })
    }
    loginPassword = (e) => {
        const password = e.target.value
        this.setState({ password })
    }

    acceptLogin = (e) => {
        e.preventDefault()
        
        logic.authenticateUser(this.state.dni, this.state.password)
            .then(resp => {

                swal(
                    'Successful login',
                ).then(this.props.history.push('/home'))
            })
            .catch(err => 
                {
                    swal(
                        err.message,
                    )
                })  
        }


    

    render() {
        return (
            <div>
                 <div className="general">
                    <section>
                    
                    <form  onSubmit={this.acceptLogin}>
                        <p className="text1"> Dni</p>
                        <input autocomplete="off" className="formulariol" type="text" value={this.state.dni} onChange={this.loginDni}  name="DNI" ></input>
                        <p className="text3"> Password</p>
                        <input autocomplete="off" className="formulariol" type="password" value={this.state.password} onChange={this.loginPassword} name="password"></input>
                    <button type="submit" className="login-buttonL">Login</button>
                    </form>
                   
                  
                        <p>New in Sweet Home?</p> 
                        <Link to="/register">
                            <p > Register now</p>
                        </Link>
                    </section>
                </div>
           
            </div>
        )
    }


}

export default Login