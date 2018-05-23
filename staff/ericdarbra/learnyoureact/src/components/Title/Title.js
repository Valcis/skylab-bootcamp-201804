import React from 'react'


class Title extends React.Component {
    render(){if (Object.keys(this.props.data).length === 0){
        
        return <h1>{this.props.text}</h1>
    }  
    else{
        return <h1>You've searched for {this.props.name}</h1>
    }
}
}


export default Title