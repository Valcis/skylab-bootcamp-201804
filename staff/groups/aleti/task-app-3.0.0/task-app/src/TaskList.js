import React from 'react'

function TaskList(props) { // dumb
    return <div>
        {props.list.length > 0 && <div><h2>{props.text}</h2></div>}
        <ul>
            {props.list.map((item, index) => 
            <li key={index}>{item} <button onClick={() => {props.handle(index)}}>X</button></li>
            )}
        </ul>
    </div>
}

export default TaskList