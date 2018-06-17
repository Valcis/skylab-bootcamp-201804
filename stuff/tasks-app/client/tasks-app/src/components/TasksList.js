import React from 'react'

/**
 * 
 * @param {*} props 
 */
function TaskList(props) {
    return props.tasks.length > 0 &&
        <section>
            <h2>{props.title}</h2>

            <ul>
                {props.tasks.map(task => <li key={task.id}>{task.text} <button onClick={() => props.handleTask(task.id)}>V</button></li>)}
            </ul>
        </section>
}

export default TaskList