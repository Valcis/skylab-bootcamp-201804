import React from "react";

function MainContent(props) {
  /* {props.onError === true ?  */

  return (
    //if(props.onError === false){
    <div>
      {props.onError === false ? (
        <section>
          {props.data.name !== null ? (
            <h2>{props.data.name}</h2>
          ) : (
            <h2>{props.data.login}</h2>
          )}
          <img src={props.data.avatar_url} title={props.data.login} />
          <h3>{props.data.location}</h3>
        </section>
      ) : (
        <h2>User not found</h2>
      )}
    </div>
  );
}

export default MainContent;
