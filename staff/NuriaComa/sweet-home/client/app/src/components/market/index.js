import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import {Link} from 'react-router-dom'


class Market extends Component {

    state ={
        name:'',
        market:[],
        marketId:'',
    }
    componentDidMount() {
        const apartId = localStorage.getItem('apartmentId')
        logic.listMarket(apartId)
                .then((market)=>{
                    this.setState(prevState => ({market}))
        })
    }
    nameMarket =(e) => {
        const name = e.target.value
        this.setState({name})
    }
    checkInput = ()=>{

        if(this.state.name === '')
        {alert("text cannot be empty")}
       
    }

    addMarket = (e) =>{

        e.preventDefault()

        const apartId = localStorage.getItem('apartmentId')

        Promise.resolve()
        .then(() => this.checkInput())
        .then(()=>{
            logic.addMarket(this.state.name, apartId).then(()=>{
                this.state.name=''
                logic.listMarket(apartId)
                .then((market) => {
                    this.setState(prevState => ({market}))
                })
                
            })
        })
        
    }
    deleteMarket = id =>{
        const apartId = localStorage.getItem('apartmentId')

        Promise.resolve()
        .then(()=>{
           logic.deleteMarket(id)
           .then(() => {
            logic.listMarket(apartId)
                .then((market) => {
                    this.setState(prevState => ({market}))
                })
           })

        })
    }

    render() {
        return (
            <div>
                <div className="general">
                    <section>
                        <h2 className="usm">MARKET</h2>
                         <form onSubmit={this.addMarket}>
                          
                            <input autocomplete="off" className="formulariom" type="text" value={this.state.name}onChange={this.nameMarket} name="name" ></input>
                            <button className="butAddM">ADD</button>
                         </form>
                         <ul className="textM">
                         {this.state.market ? this.state.market.map(market => {
                                return(
                                <div key={market._id} className="listmarket"><li  className="dataM">🛒   {market.name}<button className="deleteM" onClick={() => this.deleteMarket(market._id)}>✘</button></li></div>)
                            }) : undefined
                        }
                        </ul>
                        <Link to="/home">
                             <button className="backm">BACK</button>
                        </Link>
                    </section>
                </div>
            </div>
        )
    }
}
export default Market