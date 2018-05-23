import React from 'react'

function Input(props){

    return <input type='text' onChange={props.handleChange} value={props.value}/>
}
export default Input