import React from 'react'

function Title(props){
        return <div>
            {Object.keys(props.data).length > 0 
            ?  <h1> You searched: {props.data.login} </h1>
            : <h1>Welcome to React</h1>}
        </div>
}

export default Title