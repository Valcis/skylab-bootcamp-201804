import React, {Component} from 'react'

function MainContent (props) {
    let section

    if (props.userInfo.message === "Not Found") {
        return section = <h2>User not founded 😥</h2>
    }
    
    if (props.userInfo.id === undefined) {
        section = <h2>Insert a valid username and search info</h2>
    } else {
        const link =  
        section = <section className="user-info">
            <h6>Name:</h6>
            <h3>{props.userInfo.name}</h3>
            <img className="image" src={props.userInfo.avatar_url} />
            <h6>Link:</h6>
            <a href={props.userInfo.html_url}> GitHub {props.userInfo.html_ur}  /  {props.userInfo.login} </a>
        </section>
    }

    return section

}

export default MainContent