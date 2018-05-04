import React from 'react'

function ShowDetails(props) {
    if (props.onState.userDetails.name) {
        return <div>
            <h2> User Details </h2>
            <ul>
                <li><img src={props.onState.userDetails.avatar_url} /></li>
                <li>Name: {props.onState.userDetails.name}</li>
                <li>Followers: {props.onState.userDetails.followers}</li>
                <li>Following: {props.onState.userDetails.following}</li>
            </ul>
        </div>
    }
    return <div></div>
}



export default ShowDetails
