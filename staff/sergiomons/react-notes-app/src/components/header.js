import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';

const Header = props => {

    const renderHeader = () => {
        if (props.isLogged) {
            return (
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link className="navbar-brand disabled" to="/home">
                            Cinema<span className="text-warning">Quiz</span>
                        </Link>

                        <div className="" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">
                                        Home
                                        <span className="sr-only">
                                            (current)
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/play">
                                        Play
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/ranking">
                                        Ranking
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/weather">
                                        Er'Weather
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/logout"
                                        className="nav-link btn btn-link"
                                    >
                                        Logout
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </nav>
                </header>
            );
        } else {
            return (
                <div className="jumbotron text-center">
                    <h1 className="display-4">
                        AppNote
                    </h1>
                </div>
            );
        }
    };

    return renderHeader();

}

export default withRouter(Header);