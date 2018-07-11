import React, { Component } from 'react'
import logic from '../../logic'
import {Link} from 'react-router-dom'
import './index.css'


class ListApartment extends Component {
   
    state = {
        apartmentInfo:[],
        apartmentId:''
    }
    
    componentDidMount(){
        Promise.resolve()
        .then(()=>{
            const apartmentId = localStorage.getItem('apartmentId')
            logic.listApartment(apartmentId).then(res => { 
                
                this.setState({
                    apartmentInfo: res
                })
                this.setState({
                    apartmentId: res.id
                })
            })
        })
    }
    
    update= (_id) => {
       
        (this.props.history.push(`/updateapartment/${_id}`))
       
        
    }
  
    
    render() {
        return (
            <div >
                <div>
                    <section>
                        <h2 className="ap">APARTMENT</h2>

                        <ul className="textA">
                       
                            {this.state.apartmentInfo ? 
                            
                                <div className="listApartment2"><button  className="smallButA" type="submit" onClick={() => this.update(this.state.apartmentInfo._id)}>EDIT</button>
                                <li><span className="info">Id apartment:</span> {this.state.apartmentInfo._id}</li><li><span className="info">Name:</span> {this.state.apartmentInfo.name}</li>
                                <li><span className="info">Address:</span> {this.state.apartmentInfo.address}</li>
                                <li><span className="info">Phone:</span> {this.state.apartmentInfo.phone}</li>
                                <li><span className="info">Owner:</span> {this.state.apartmentInfo.owner}</li>
                                <li><span className="info">Real State:</span> {this.state.apartmentInfo.realState}</li>
                                </div>
                            : undefined
                            }
                        </ul>
                        <Link to="/home">
                             <button className="backAp">BACK</button>
                        </Link>
                       
                    </section>
                </div>
            </div>
        )
    }
}
export default ListApartment