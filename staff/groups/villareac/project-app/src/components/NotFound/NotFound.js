import React, { Component } from "react"
import '../Main/main.css'
import './notFound.css'

class NotFound extends Component {

    render() {
        return (
            <div className="notFound">
                <h2>404 page not found</h2><br/>
                <p>We are sorry but the page you are looking for does not exist</p>
            </div>
        )
    }
}

export default NotFound