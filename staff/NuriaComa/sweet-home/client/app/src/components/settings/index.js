import React, { Component } from 'react'
import logic from '../../logic'
import {Link} from 'react-router-dom'
import './index.css'


class Settings extends Component {
   
    
  
    
    render() {
        return (
            <div >
                <div>
                    <section>
                        <h2 className="usS">SETTINGS</h2>

                        <h3 className="lang" >Language</h3>
                        <form className="formSettings">
                        <select name="languagelist" form="languageform">
                            <option value="hide">-- Language --</option>
                            <option value="English">English</option>
                            <option value="Catalan">Catalan</option>
                            <option value="Spanish">Spanish</option>
                        </select>
                        </form>
                        <Link to="/home">
                             <button className="backS">BACK</button>
                        </Link>
                       
                    </section>
                </div>
            </div>
        )
    }
}
export default Settings