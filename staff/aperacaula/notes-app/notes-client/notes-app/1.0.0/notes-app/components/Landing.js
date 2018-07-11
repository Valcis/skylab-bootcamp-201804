import React from 'react'
import { Link } from "react-router-dom";


function Landing (props){
        return(
            <div>
                <header>
                    <Link to="/login">
                    <button>Login</button>
                    </Link>
                    <Link to="/register">
                    <button>Register</button>
                    </Link>
                </header>
                <main>
                    <h1>Hello! This is LilamSucks!</h1>
                </main>
            </div>
        )
}




export default Landing