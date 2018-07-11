import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import {Link} from 'react-router-dom'


class Tasks extends Component {

    state ={
        name:'',
        tasks:[],
        taskId:'',
        users:[],
       
    }
    getTask =()=>{
        const apartId = localStorage.getItem('apartmentId') 
        
        
        logic.listUsers(apartId)
        .then(users =>{
            this.setState(prevState=>({users}))
        })
        logic.listTasks(apartId)
        .then((tasks)=>{
            this.setState(prevState => ({tasks}))
})
    }
    componentDidMount() {
        this.getTask()
    }
    nameTask =(e) => {
        const name = e.target.value
        this.setState({name})
    }
    checkInput = ()=>{

        if(this.state.name === '')
        {alert("task cannot be empty")}
       
    }
    rotateTask =( )=>{
       this.state.users.map((user, index) => {
           user[index].taskId
       })

    }
    addTask = (e) =>{

        e.preventDefault()

        const apartId = localStorage.getItem('apartmentId')
        Promise.resolve()

        .then(() => this.checkInput())
        .then(()=>{
            logic.addTasks(this.state.name, apartId)
            .then(task=>{
                
                const userWithoutTask = this.state.users.find(user => user.taskId === '' || !user.taskId)
                    if(userWithoutTask) {
                        this.state.name=''

                        logic.relateUserTask(userWithoutTask._id, task.id)
                        .then( () => {
                            this.getTask()
                        })
                    }
                })

            })
        

    }
    deleteTask = (id) =>{

        Promise.resolve()
        .then(()=>{
           logic.deleteTask(id)
           .then(() => {
                this.getTask()
           })

        })
    }

    rotateTask = ()=>{
        
        const apartId = localStorage.getItem('apartmentId')
        logic.rotateUsersTasks(apartId)
        .then(() => {
            this.getTask()
       })
    }

    render() {
        return (
            <div>
                <div className="general">
                    <section>
                        
                        <h2 className="ust">TASKS</h2>
                        <div className="formTask">
                        {this.state.users.length > this.state.tasks.length ? 
                        <form   onSubmit={this.addTask}>
                         
                           
                            <input maxLength="23"  autoComplete="off" className="formulariot" type="text" value={this.state.name}onChange={this.nameTask} name="name" ></input>
                            <button className="butAddT" type='submit' >ADD</button>
                         </form>

                           : undefined
                        }
                        </div>
                          <div><button className="butRot" onClick={() => this.rotateTask()}>rotate</button></div>
                         <ul className="textt">
                        
                         {this.state.tasks ? this.state.tasks.map( (tasks) => {
                            const user = this.state.users.filter(user => user.taskId === tasks._id)

                            if (user.length > 0) {
                                return(
                                    <div key={tasks.name} className="listTasks"><li className="datat">{user[0].name}: {tasks.name} <button className="deleteT" onClick={() => this.deleteTask(tasks._id)}>✘</button></li>
                                    </div>
                                )
                            }

                            return null
                            }) : undefined
                        }
                        </ul>
                        
                        <Link to="/home">
                             <button className="backt">BACK</button>
                        </Link>
                        
                    </section>
                </div>
            </div>
        )
    }
}
export default Tasks