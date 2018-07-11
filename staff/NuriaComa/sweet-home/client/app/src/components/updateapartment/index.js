import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import './index.css'
import swal from 'sweetalert2'

class UpdateApartment extends Component {

    state = {
       
        apartmentId: '',
        name:'',
        address:'',
        phone:'',
        owner:''
        

    }
    componentWillMount() {
       
                const apartmentId=this.props.match.params.id
                
                logic.listApartment(apartmentId)
                .then(apartment => {
                    this.setState({
                        
                            name: apartment.name,
                            address: apartment.address,
                            phone: apartment.phone,
                            owner: apartment.owner,
                            realState:apartment.realState
                    })
                   
                })
    }
    updateName = (e) => {
        const name = e.target.value
        this.setState({ name })
    }
    updateaddress = (e) => {
        const address = e.target.value
        this.setState({ address })
    }
    updatePhone = (e) => {
        const phone = e.target.value
        this.setState({ phone })
    }
    updateowner = (e) => {
        const owner = e.target.value
        this.setState({ owner })
    }
    updaterealState = (e) => {
        const realState = e.target.value
        this.setState({ realState })
    }
  
    

    updateInfo = () => {
       
        Promise.resolve()
        .then(()=> {
            let body= {
                name: this.state.name,
                address: this.state.address,
                phone: this.state.phone,
                owner: this.state.owner,
                realState: this.state.realState,
               
            }
            return body
        })
        .then(body => {
            
            const id = localStorage.getItem('apartmentId')
            logic.updateApartment(id, body.name, body.address, body.phone, body.owner, body.realState)
           
            .then(()=> swal(
                'Changes saved!'
            ))
            .catch(err => swal(
                err.message
            ))
        })
        
        
    
       
}
    backInfo = (_id) => {
            (this.props.history.push(`/house/${_id}`))
           
       }
    deleteApartment = apartmentId =>{
        const apartId = localStorage.getItem('apartmentId')

        Promise.resolve()
        .then(()=>{
            swal({
                title: 'Are you sure?',
                text: "All users will be removed",
                showCancelButton: true,
                confirmButtonColor: '#105380',
                cancelButtonColor: '#829bac',
                confirmButtonText: 'Yes, delete it!'
              })
              .then((result) => {
                if (result.value) {
                  swal(
                    'Deleted!',
                    'Your apartment has been deleted.',
                    'success'
                    )
                    logic.deleteApartment(apartId)
                   
                    
                }
            })
            .then(() => this.props.history.push('/'))     
            .then(() => localStorage.clear())     
                       
        })
    }

render() {
    return (
        <div >
            <div>
                <section>

                    <h2 className="usUA">APARTMENT</h2>
                    <ul className="textUA">
                       
                                <form className="listApartment">
                                    <p className="t">NAME: </p>
                                    <input className='fUpdA' type="text" name="name" value={this.statename} onChange={this.updateName} />
                                    <p className="t">ADDRESS: </p>
                                    <input className='fUpdA' type="text" name="address" value={this.stateaddress} onChange={this.updateaddress} />
                                    <p className="t">PHONE: </p>
                                    <input className='fUpdA' name="text" type="phone"   value={this.statephone} onChange={this.updatePhone} />
                                    <p className="t">OWNER: </p>
                                    <input className='fUpdA' type="text" name="owner" value={this.stateowner} onChange={this.updateowner} />
                                    <p className="t">REAL STATE: </p>
                                    <input className='fUpdA' type="realState" name="realState" value={this.staterealState} onChange={this.updaterealState} />
                                    <div className="butUA">
                                    </div>
                                 </form>
                                 <div className="butGroup">
                                        <button className="smallButUA1" onClick={() => this.updateInfo()}>SAVE</button>
                                        <button className="smallButUA2" onClick={() => this.deleteApartment(this.state.apartmentId)}>DELETE</button>
                                </div>
                        
                    </ul>
                   
                        <button onClick={() => this.backInfo(this.state.apartmentId)} className="backAp">BACK</button>
                   

                </section>
            </div>
        </div>
        )
    }   






}

export default UpdateApartment 