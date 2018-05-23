import React from "react";

function MainContent(props) {
  if(props.thereIsError){
      return (<p>User not found</p>)
  }
  return (
    <div>
      {props.searchedUsers.length===0 &&
      <p><strong>Enter valid username and search for info!</strong></p>}
      {props.searchedUsers.length > 0 && (
        <section>
          <p><strong>Name:</strong> {props.lastUserSearched.login}</p>
          <img src={props.lastUserSearched.avatar_url} />
          <p>
            <strong>Bio:</strong>
            {props.lastUserSearched.bio}{" "}
          </p>
          <p>
            <strong>Social:</strong><br/>{props.lastUserSearched.followers}<br/>{props.lastUserSearched.following}
          </p>
          <p><strong>Location:</strong>{props.lastUserSearched.location}</p>
        </section>
      )}
    </div>
  );
}

export default MainContent;
