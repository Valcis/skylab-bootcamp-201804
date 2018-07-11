import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import swal from 'sweetalert'

class Apartment extends Component {

    state = {
        name: '',
        address: '',
        phone: '',
        apartId: '',
        apartmentId: null,
        check: false
    }
    componentWillMount() {
        Promise.resolve()
            .then(() => {
                this.setState({
                    apartmentId: localStorage.getItem('apartmentId') 
                })
            })

    }

    registerName = (e) => {
        const name = e.target.value
        this.setState({ name })
    }
    registerAddress = (e) => {
        const address = e.target.value
        this.setState({ address })
    }
    registerPhone = (e) => {
        const phone = e.target.value
        this.setState({ phone })
    }
    checkapartId = (e) => {
        const apartId = e.target.value
        this.setState({ apartId })
    }

    checkInput = (name, address, phone) => {
        if (name === '') { 
            alert("name cannot be empty")
            return true
         }

        if (address === '') {
            alert("address cannot be empty")
            return true
        }

        if (phone === '') {
            alert("phone cannot be empty")
            return true
        }
        return false
    }
    checkApartment = apartId => logic.listExistingApartment(apartId);
    checkId = (apartId) =>{
        
        if (this.apartId === this.apartmentId){
            this.setState.check({check:true})
        }
    }
    acceptRegister = (e) => {
        e.preventDefault() 
        const { name, address, phone, apartId, apartmentId } = this.state

                if ( apartId === '' && apartmentId ===null) {
                    if(this.checkInput(name,address,phone)) return
                    logic.registerApartment(name,address,phone)
                    .then(res => {
                            swal({
                                type: 'success',
                                title: 'Welcome',
                                text: 'Sweet Home!',
                                footer: '<a href>Why do I have this issue?</a>',
                            }).then(() => {
                                this.props.history.push("/registeruser")
                            })
                        })
                        .catch(err => {
    
                            this.setState({
                                name: '',
                                address: '',
                                phone: '',
                            })
                            alert(err)
                        })

                }
                if (apartId !== '') {

                    this.checkApartment(apartId).then(() => {
                        localStorage.setItem('apartmentId', apartId);
                        console.info('ola ke ase')
                        this.props.history.push("/registerUser")
                    })
                    .catch(err => 
                        alert(`apartmentid don't match ${err}`)
                    )
            }
            
    }

    redirect = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <div className="general">
                    <section>
                        <h3 className="usAR">APARTMENT</h3>
                        <h2 className="t2" >New apartment?</h2>
                        <form onSubmit={this.acceptRegister}>
                            <p className="wordsRA"> Name </p>
                            <input autocomplete="off" className="formularior" type="text" value={this.state.name} onChange={this.registerName} name="name" ></input>
                            <p className="words">Address</p>
                            <input autocomplete="off" className="formularior" type="text" value={this.state.address} onChange={this.registerAddress} name="address"></input>
                            <p className="words">Phone </p>
                            <input autocomplete="off" className="formularior" type="text" name="phone" value={this.state.phone} onChange={this.registerPhone} ></input>
                            <button className="registerButton" type="submit">Continue</button>
                            <p className="wordsId">Existing apartment id? </p>
                            <input autocomplete="off" className="formularior" type="text" name="apartId" value={this.state.apartId} onChange={this.checkapartId} ></input>
                            <button className="registerButton" type="submit">Continue</button>
                        </form>
                            <button className="backButton" type="button" onClick={this.redirect}>Back</button>

                    </section>
                </div>
            </div>
        )
    }
}
export default Apartment