import React from 'react'
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom'


function Button(props) {

  const { name, destination, nameLink} = props;

  return (
    <div className="form-group">
      <button className="btn btn-success">{name}</button>
      <Link to={`/${destination}`} className="btn btn-link">{nameLink}</Link>
    </div>
  )
}

export default withRouter(Button)
