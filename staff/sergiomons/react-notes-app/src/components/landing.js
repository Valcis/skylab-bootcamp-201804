import React from 'react'
import Header from './header'
import { Link } from 'react-router-dom'

function Landing(props) {
    return (
        <div>
           <Header /> 
         <main>
        <h1>Landing</h1>
        <Link to="/register">Register</Link>
        &nbsp;|&nbsp;
            <Link to="/login">Login</Link>
        </main>
    </div>
    )
}

export default Landing