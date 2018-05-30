import React, { Component } from 'react';
import logic from './logic'
import TasksList from './components/TasksList'

class App extends Component {
  state = {
    text: '',
    todos: [],
    dones: []
  }

  addTask = e => {
    e.preventDefault()

    logic.addTask(this.state.text)

    this.setState({
      text: '',
      todos: logic.listTodos(),
      dones: logic.listDones()
    })
  }

  updateText = e => {
    this.setState({
      text: e.target.value
    })
  }

  markTaskDone = (id) => {
    logic.markTaskDone(id)

    this.setState({
      todos: logic.listTodos(),
      dones: logic.listDones()
    })
  }

  removeTask = (id) => {
    logic.removeTask(id)

    this.setState({
      dones: logic.listDones()
    })
  }

  render() {
    return (
      <div className="App">
        <h1>tasks app</h1>

        <h2>add task</h2>

        <form onSubmit={this.addTask}>
          <input type="text" onChange={this.updateText} value={this.state.text} />
          <input type="submit" value="add" />
        </form>

        <TasksList title={'TODO list'} tasks={this.state.todos} handleTask={this.markTaskDone} buttonTitle={'V'} />

        <TasksList title={'DONE list'} tasks={this.state.dones} handleTask={this.removeTask} buttonTitle={'X'}/>
      </div>
    );
  }
}

export default App;
