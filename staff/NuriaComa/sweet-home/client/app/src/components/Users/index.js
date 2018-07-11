import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import './index.css'
import swal from 'sweetalert2'


class Users extends Component {
    state = {
        usersInfo: [],
        userId: '',
    }
    componentWillMount() {
        Promise.resolve()
            .then(() => {
                const apartmentId = localStorage.getItem('apartmentId')
                logic.listUsers(apartmentId).then(res => {

                   
                    this.setState({
                        usersInfo: res
                    })
                    this.setState({
                        userId: res.id
                    })
                })
            })

    }
   
    update= (_id) => {
       
        (this.props.history.push(`/updateuser/${_id}`))
    }

  logOut=() =>{
    Promise.resolve()
        this.props.history.push('/')     
        localStorage.clear()    
                       
    }
    newUser= () => {
       
        (this.props.history.push('/registeruser'))
    }
  
    

render() {
    return (
        <div >
            <div>
                <section>

                    <h2 className="usUI">USERS</h2>
                    <div className="butGroupU">
                    <button className="smallButN1"  onClick={() => this.newUser()}>NEW USER</button>
                    <button className="smallButN2"  onClick={() => this.logOut()}>LOG OUT</button>
                    </div>
                    <ul className="text">
                        {this.state.usersInfo ? this.state.usersInfo.map((users) => {
                            return (
                                <div key={users.name} className="listUsers"><li><span className="data">Name:</span> {users.name}</li>
                                    <li><span className="data">Surname:</span> {users.surname}</li>
                                    <li><span className="data">Phone:</span> {users.phone}</li>
                                    <li><span className="data">Dni:</span> {users.dni}</li>
                                    <button  className="smallButE" type="submit" onClick={() => this.update(users._id)}>EDIT</button></div>)
                        }) : undefined
                        }
                    </ul>
                    <Link to="/home">
                        <button className="backU">BACK</button>
                    </Link>

                </section>
            </div>
        </div>
        )
    }   
}
export default Users