import React from 'react'
import './UsersList.css'

function UsersList(props) {
  return (
    <div className="user-items-container">
      {props.users.map((item) => {
        return (
          <div className="user-item" key={item.id} onClick={() => props.handleUsers(item.login)}>
            <div className="user-image"><img src={item.avatar_url} alt=""/></div>
            <div className="user-login">{item.login}</div>
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
