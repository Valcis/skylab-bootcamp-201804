import React from 'react'

function Title (props) {
   let tit = props.userInfo === undefined ? "Welcome to React" : "You searched: " + props.thisUser
    return <h1>{tit}</h1>
    
}

export default Title