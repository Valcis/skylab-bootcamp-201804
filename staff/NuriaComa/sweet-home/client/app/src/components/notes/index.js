import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import {Link} from 'react-router-dom'


class Notes extends Component {

    state ={
        name:'',
        notes:[],
        noteId:'',
    }
    componentDidMount() {
        const apartId = localStorage.getItem('apartmentId')
        logic.listNotes(apartId)
                .then((notes)=>{
                    this.setState(prevState => ({notes}))
        })
    }
    nameNotes =(e) => {
        const name = e.target.value
        this.setState({name})
    }
    checkInput = ()=>{

        if(this.state.name === '')
        {alert("note cannot be empty")}
       
    }

    addNotes = (e) =>{

        e.preventDefault()

        const apartId = localStorage.getItem('apartmentId')

        Promise.resolve()
        .then(() => this.checkInput())
        .then(()=>{
            logic.addNotes(this.state.name, apartId).then(()=>{
                this.state.name=''
                logic.listNotes(apartId)
                .then((notes) => {
                    this.setState(prevState => ({notes}))
                })
                
            })
        })
        
    }
    deleteNote = id =>{
        const apartId = localStorage.getItem('apartmentId')

        Promise.resolve()
        .then(()=>{
           logic.deleteNote(id)
           .then(() => {
            logic.listNotes(apartId)
                .then((notes) => {
                    this.setState(prevState => ({notes}))
                })
           })

        })
    }

    render() {
        return (
            <div>
                <div className="general">
                    <section>
                        <h2 className="usN">NOTES</h2>
                         <form onSubmit={this.addNotes}>
                            <input autocomplete="off" className="formularioN" type="text" value={this.state.name}onChange={this.nameNotes} name="name" ></input>
                            <button className="butAddN">ADD</button>
                         </form>
                         <ul className="textN">
                         {this.state.notes ? this.state.notes.map(notes => {
                                return(
                                <div key={notes._id} className="listNotes"><li className="dataN">🖊 {notes.name}<button  className="deleteN" onClick={() => this.deleteNote(notes._id)}>✘</button></li></div>)
                            }) : undefined
                        }
                        </ul>
                        <Link to="/home">
                             <button className="backn">BACK</button>
                        </Link>
                    </section>
                </div>
            </div>
        )
    }
}
export default Notes