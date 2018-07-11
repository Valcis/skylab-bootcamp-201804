import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import logic from '../../logic'
import './index.css'
import home from'./images/home.png';
import config from'./images/config.png';
import market from'./images/market.png';
import notes from'./images/notes.png';
import tasks from'./images/tasks.png';
import users from'./images/users.png';

class Home extends Component {

   
    render () {
      
        return(
        <div className="general">
            <div >
        <header >
            <h1 className="tittleH">SWEET HOME</h1>
        </header>
        <main>
        <section >
            <div className="box1">
            <Link to="/house">
                <img src={home} alt=""/>
            </Link>
            </div>
            <div className="box2">
            <Link to="/users">
                <img src={users} alt=""/>
            </Link>
            </div>
            <div className="box3">
            <Link to="/market">
                <img src={market} alt=""/>
            </Link>
            </div>
            <div className="box4">
            <Link to="/tasks">
                <img src={tasks} alt=""/>
            </Link>
            </div>
            <div className="box5">
            <Link to="/notes">
                <img src={notes} alt=""/>
            </Link>
            </div>
            <div className="box6">
            <Link to="/settings">
                <img src={config} alt=""/>
            </Link>
            </div>
        </section>
    </main>
</div>

        </div>

        )
        
    }

}

export default Home