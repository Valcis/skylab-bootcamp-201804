import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Account from '../components/Account'
import Update from '../components/Update'
import {withRouter} from 'react-router-dom'

class ProfilePage extends Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">

                        {<h1> {localStorage.getItem('userName')}'s Profile </h1>}

                        <div>
                            <Link to="/profile/update" className="btn btn-link">Public</Link>
                            <Link to="/profile/account" className="btn btn-link">Account</Link>
                            <Link to="/" className="btn btn-link">Home</Link>
                        </div>

                        <div>
                            <Route exact path="/profile/update" component={Update} />
                            <Route exact path="/profile/account" component={Account} />
                        </div>

                        

                    </div>
                    
                </div>

            </div>
            
        );
    }
}

export default withRouter(ProfilePage);