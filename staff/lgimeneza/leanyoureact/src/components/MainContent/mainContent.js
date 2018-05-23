import React, {Component} from 'react'

function MainContens(props){
    return(
        <div>
            { Object.keys(props.data).length > 0  ? (
                <div>
                    <h3>Name: { props.data.login }</h3>
                    <img src={ props.data.avatar_url } title={ props.data.login }/>
                    <p>Location: { props.data.location }</p> 
                </div>
            ) : (
                <h3></h3>
            )}
        </div>
    )
}

export default MainContens