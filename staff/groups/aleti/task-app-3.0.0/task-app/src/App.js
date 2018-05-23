import React, {Component} from 'react'
import TaskList from './TaskList'

class TaskApp extends Component{
    constructor(){
        super()

        this.state = {
            value: '' ,
            todos: [],
            dones: []
        }
    }

    handleChange = event => {
        this.setState({value: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()

        const todo = this.state.value

        this.setState(prevState => {
            return {
                value: '',
                todos: [...prevState.todos, todo],
            }
        })
    }

    handleDone = (index) => {
        let todos = [];

        for(let i = 0; i< this.state.todos.length; i++){
            if (i !== index){ todos.push(this.state.todos[i]) }
        }

        this.setState(prevState => {
            return {
                todos,
                dones: [...prevState.dones, prevState.todos[index]]
            }
        })
    }

    handleDeleted = (index) => {
        let dones = [];

        for(let i = 0; i< this.state.dones.length; i++){
            if (i !== index){ dones.push(this.state.dones[i]) }
        }

        this.setState(prevState => {
            return {
                dones
            }
        })
    }

    render(){
        return<div>
            <form>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" onClick={ this.handleSubmit } value="add"/>
            </form>
            <TaskList handle={this.handleDone} list={this.state.todos} text={"Todo's"} />
            <TaskList handle={this.handleDeleted} list={this.state.dones} text={"Done's"} />
        </div>
    }
}

export default TaskApp
