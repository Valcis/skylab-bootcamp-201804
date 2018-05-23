import React from 'react'

function Title (props){
    if(props.thereIsError){
        return (<h1>Error!! Invalid User</h1>)
    }
    return <h1>{props.text}</h1>
}

export default Title