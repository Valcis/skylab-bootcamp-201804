
import React from 'react';

function MainContent(props) {

  let image = props.data.avatar_url
  let length = object.keys(props.objeto).length


  return length ?  <div>

    <h1>Content</h1>
    <p>{props.data.name}</p>
    <img src={image}/>
    <p>Location: {props.data.location}</p>
    <p>Repos: {props.data.public_repos}</p>
    <p>followers: {props.data.followers}</p>
    <p>Blog: {props.data.blog}</p>
    <p>Bio: {props.data.bio}</p>


  </div>
  :
  ''

}
export default MainContent;
