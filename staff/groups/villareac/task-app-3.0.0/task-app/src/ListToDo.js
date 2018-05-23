import React from 'react'

function ListToDo(props){
    function handleClick(taskId){
        props.markTaskDone(taskId)
    }

    return <ul>{props.tasks.map((task, index) => <li key= {index}> {task.text} <button onClick={() => props.handleClick(task.id)}>done</button> </li>)}</ul>
}
export default ListToDo