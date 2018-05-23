import React from 'react'
import './UsersList.css'

function printList(data, _retrieveUser) {
    //console.log(handler)
    let nameList = data.map(user =>   
        <div key={user.id}>
            <ul>
                <li>{user.login}</li>
                <li><a onClick={() => {
                    _retrieveUser(user.login)
                }}><img src={user.avatar_url} alt="hello"/></a></li>
            </ul>
        </div>
    )

return nameList

}

function UsersList(props) {
    let list = printList(props.data, props._retrieveUser); 
    return <div className="usersList">{list}</div>   
}

export default UsersList