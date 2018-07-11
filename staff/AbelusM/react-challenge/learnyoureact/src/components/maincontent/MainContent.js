import React from 'react';
import '../App.css';
import './mainContent.css';


function MainContent(props) {
    if (props.dataUser.id) {
        return <div className="Main">
            <p>{props.dataUser.name}</p>
            <img src={props.dataUser.avatar_url} alt="" />
            <h3>Bio:{props.dataUser.bio}</h3>
            <h3>Social:</h3>
            <h3>{props.dataUser.following}</h3>
            <h3>{props.dataUser.followers}</h3>
            <h3>Location: {props.dataUser.location}</h3>
        </div>
    }else if (props.dataUser.message){
        return <h2>User not found :(</h2>
    } else {
        return <h2>Here goes the content</h2>
    } 
}

export default MainContent