import React from "react"
import { Link } from "react-router-dom"


function Header(props) {

    return <header>

        <nav >
                <ul className="bar-ul ">
                <li className="bar-item">
                        <Link className="bar-link" to="/">Landing</Link>
                    </li>
                    <li className="bar-item">
                        <Link className="bar-link" to="/login">Login</Link>
                    </li>
                    <li className="bar-item">
                        <Link className="bar-link" to="/register">Register</Link>
                    </li>
                </ul>
        </nav>

    </header>
}

export default Header;