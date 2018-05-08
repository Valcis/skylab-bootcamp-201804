import React, { Component } from 'react'
import logic from '../../logic/logic'
import {Link} from 'react-router-dom'
import swal from 'sweetalert2'

class RegisterUser extends Component {
    

    state = {
        username:'',
        password:'',
        repeatpassword:'',
        email:'',
        check:true
    }

    registerUsername =(e) => {
        const username = e.target.value
        this.setState({username})
    }
    registerPassword = (e) => {
        const password = e.target.value
        this.setState({password})
    }
    registerRepeatPassword = (e) => {
        const repeatpassword = e.target.value
        this.setState({repeatpassword})
     
    }
    registerEmail = (e) => {
        
        const email = e.target.value
        this.setState({email})
    }
    checkFields = () =>{
        if(this.state.username === ''){alert("Username cannot be empty")}

        else if(this.state.email===''){
            alert("Email cannot be empty")}

        else if(this.state.password === ''){
            alert("Password cannot be empty")}

        else if(this.state.repeatpassword === ''){
            alert("You must repeat your password")}
        
        else if(this.state.password !== this.state.repeatpassword){
            
            this.setState({check:false})
            
        }else{
            this.setState({check:true})
        }
    }

    acceptRegister = (e) =>{
       console.log(this.props.history)
        e.preventDefault()
        Promise.resolve()
        .then(() => this.checkFields())
        .then(()=> {
            if(!this.state.check){
                this.setState({
                    password:'',
                    repeatpassword:''})
                alert("Passwords don't match ;(")
            }
            else{
            logic.registerUser(this.state.username, this.state.password,this.state.email)
            .then(resp => {
                swal(
                    'Holi',
                    this.props.history.push("/login")

                )

                // this.setState({
                //     username:'',
                //     password:'',
                //     email:'',
                //     repeatpassword:'',
                    
                // })
                
            })
            .catch(err => {
                
                this.setState({
                    username:'',
                    password:'',
                    email:'',
                    repeatpassword:''})
                
                alert(err)})
                
            }


        })
        
        
    }



    render() {
        return (

            <div>
                <form onSubmit={this.acceptRegister}>
                    
                    <p>Username</p>
                    <input type="text" name="username" value={this.state.username}onChange={this.registerUsername}/>
                    <p>E-mail</p>
                    <input type="text" value={this.state.email}name="email" onChange={this.registerEmail}/>
                    <p>Password</p>
                    <input type="password" name="password" value={this.state.password} onChange={this.registerPassword}/>
                    <p>Repeat Password</p>
                    <input type="password" value={this.state.repeatpassword} name="password" onChange={this.registerRepeatPassword}/>
                    <p>
                    <button type="submit">Register</button>
                    
                    </p>
                    <p>Al registrarte, aceptas las Condiciones de Servicio y la Política de Privacidad </p>
                </form>
                
                <p>

                </p>
            </div>
        )
    }
}
export default RegisterUser