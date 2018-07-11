import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import './index.css'
import swal from 'sweetalert2'

class UpdateUser extends Component {

    state = {
       
        userId: '',
        name:'',
        surname:'',
        phone:'',
        dni:'',
        password:'',
        newPassword:'',
        

    }
    componentWillMount() {
       
                const userId=this.props.match.params.id
                
                logic.retrieveUser(userId)
                .then(user => {
                    this.setState({
                        
                            name: user.name,
                            surname: user.surname,
                            phone: user.phone,
                            dni: user.dni,
                            password:user.password
                    })
                })
    }
    updateName = (e) => {
        const name = e.target.value
        this.setState({ name })
    }
    updateSurname = (e) => {
        const surname = e.target.value
        this.setState({ surname })
    }
    updatePhone = (e) => {
        const phone = e.target.value
        this.setState({ phone })
    }
    updateDni = (e) => {
        const dni = e.target.value
        this.setState({ dni })
    }
    updatePassword = (e) => {
        const password = e.target.value
        this.setState({ password })
    }
    updateNewPassword = (e) => {
        const newPassword = e.target.value
        this.setState({ newPassword })
    }

    updateInfo = () => {
        Promise.resolve()
        .then(()=> {
            let body= {
                name: this.state.name,
                surname: this.state.surname,
                phone: this.state.phone,
                dni: this.state.dni,
                password: this.state.password,
                newPassword: this.state.newPassword,
            }
            return body
        })
        .then(body => {
            
            const id = this.props.match.params.id
            
            logic.updateUser(id, body.name, body.surname, body.phone, body.dni, body.password, body.newPassword)
           
            .then(()=> swal(
                'Changes saved!'
            ))
            .catch(err => swal(
                err.message
            ))
        })
        
          
    }
    
    deleteUser = () => {
        const id = this.props.match.params.id
        
        Promise.resolve()
        .then(()=>{
            swal({
                title: 'Are you sure?',
                text: "your user will be removed",
                showCancelButton: true,
                confirmButtonColor: '#7b9214',
                cancelButtonColor: '#c7da86',
                confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
                if (result.value) {
                swal(
                    'Deleted!',
                    'Your user has been deleted.',
                    'success'
                    )
                    logic.unregisterUser(id)
                    .then(() => this.props.history.push('/home'))
                    .then(()=> localStorage.removeItem('userId'))
                }
            })
            
        }) 
    }

render() {
    return (
        <div >
            <div>
                <section>

                    <h2 className="usU">USERS</h2>
                    <ul className="textU">
                       
                                <form className="App">
                                    <p className="t">NAME: </p>
                                    <input className='fUpd' type="text" name="name" value={this.statename} onChange={this.updateName} />
                                    <p className="t">SURNAME: </p>
                                    <input className='fUpd' type="text" name="surname" value={this.statesurname} onChange={this.updateSurname} />
                                    <p className="t">PHONE: </p>
                                    <input className='fUpd' name="text" type="phone"   value={this.statephone} onChange={this.updatePhone} />
                                    <p className="t">DNI: </p>
                                    <input className='fUpd' type="text" name="dni" value={this.statedni} onChange={this.updateDni} />
                                    <p className="t">PASSWORD: </p>
                                    <input className='fUpd' type="password" name="password" value={this.statePassword} onChange={this.updatePassword} />
                                    <p className="t">NEW PASSWORD: </p>
                                    <input className='fUpd' type="password" name="password" value={this.stateNewPassword} onChange={this.updateNewPassword} />
                                       
                                 </form>
                                    <div className="butU">
                                        <button className="smallBut1" onClick={() => this.updateInfo()}>SAVE</button>
                                        <button className="smallBut2" onClick={() => this.deleteUser(this.state.userId)}>DELETE</button>
                                    </div>
                    </ul>
                    <Link to="/users">
                        <button className="backU">BACK</button>
                    </Link>

                </section>
            </div>
        </div>
        )
    }   






}

export default UpdateUser