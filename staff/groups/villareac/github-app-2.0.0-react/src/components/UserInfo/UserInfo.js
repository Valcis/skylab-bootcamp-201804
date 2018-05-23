import React from 'react'
import './UserInfo.css'

function UserInfo(props) {
    let {avatar_url, login, following, followers, name, bio, score} = props.user
    let length = Object.keys(props.user).length

    return length ?

        <div className="userInfo">
            <h3>{login} - {name}</h3>
            <img src={avatar_url} alt=""/>
            <ul>
                <li>{followers}</li>
                <li>{following}</li>
                <li>{bio}</li>
                <li>{score}</li>
            </ul>
        </div>
    
    : ''

    
}

export default UserInfo