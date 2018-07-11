import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import swal from 'sweetalert'

class Register extends Component {

    state = {
        name:'',
        surname:'',
        phone:'',
        dni:'',
        password:'',
        repeatpassword:'',
        apartmentId:'',
        check:true
    }
    componentDidMount() {
                const apartId = localStorage.getItem('apartmentId')
                this.setState({
                    apartmentId: apartId
                })

            
    }
    registerName =(e) => {
        const name = e.target.value
        this.setState({name})
    }
    registerSurname =(e) => {
        const surname = e.target.value
        this.setState({surname})
    }
    registerPhone =(e) => {
        const phone = e.target.value
        this.setState({phone})
    }
    registerDni =(e) => {
        const dni = e.target.value
        this.setState({dni})
    }
    registerPassword = (e) => {
        const password = e.target.value
        this.setState({password})
    }
    registerRepeatPassword = (e) => {
        const repeatpassword = e.target.value
        this.setState({repeatpassword})
    }
    checkInput = ()=>{

        if(this.state.name === '')
        {alert("name cannot be empty")}

        else if(this.state.surname===''){
            alert("surname cannot be empty")}
        
        else if(this.state.phone===''){
            alert("phone cannot be empty")}

        else if(this.state.dni===''){
            alert("dni cannot be empty")}

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
        
        e.preventDefault()
        Promise.resolve()
        
        .then(() => this.checkInput())
        .then(()=> {
            if(!this.state.check){
                this.setState({
                    password:'',
                    repeatpassword:''})
                    alert("Passwords don't match ;(")
                }
                
                else{
                    const apartId = localStorage.getItem('apartmentId')
                    logic.registerUser(this.state.name,this.state.surname, this.state.phone, this.state.dni, this.state.password, apartId)
                    .then(()=> {
                        

                swal({
                    type: 'success',
                    title: 'Welcome',
                    text: 'Sweet Home!',
                    footer: '<a href>Why do I have this issue?</a>',
                  }).then(()=>{
                    this.props.history.push("/auth")
                  })

            })
            .catch(err => {
                
                this.setState({
                    name:'',
                    surname:'',
                    phone:'',
                    dni:'',
                    password:'',
                    repeatpassword:'',
                    })
                         
                alert(err)})
            }
        })
    }
    redirect= () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className="general">
                    <section>
                    <h3 className="usUR">USER</h3>
                        <form onSubmit={this.acceptRegister}>
                            <p className="wordsR"> Name </p>
                            <input autoComplete="off" className="formularior" type="text" value={this.state.name}onChange={this.registerName} name="name" ></input>
                            <p className="words">Surname</p>
                            <input autoComplete="off" className="formularior" type="text" value={this.state.surname}onChange={this.registerSurname} name="apellido"></input>
                            <p className="words">Phone </p>
                            <input autoComplete="off" className="formularior" type="text" name="phone" value={this.state.phone}onChange={this.registerPhone} ></input>
                            <p className="words">DNI </p>
                            <input autoComplete="off" className="formularior" type="text" value={this.state.dni}onChange={this.registerDni} name="dni" ></input>
                            <p className="words">Password </p>
                            <input autoComplete="off" className="formularior" type="password" value={this.state.password}onChange={this.registerPassword} name="password" ></input>
                            <p className="words">Repeat Password </p>
                            <input autoComplete="off" className="formularior" type="password" value={this.state.repeatpassword}onChange={this.registerRepeatPassword} name="password" ></input>
                            <button className="registerButton" type="submit">Register</button>
                        </form>
                            <button className="backButtonUR" type="button" onClick={this.redirect}>BACK</button>
                        
                    </section>
                </div>
            </div>
        )
    }
}
export default Register