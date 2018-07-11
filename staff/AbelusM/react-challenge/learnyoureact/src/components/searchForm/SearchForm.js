import React from 'react';
import '../App.css';
import App from '../App'
import './searchForm.css'

function SearchForm(props){
        return (
            <div className="searchform" onSubmit={props.handlerSearchUser}>
                <form>
                    <input id="formtext" text="your github name" type="text" placeholder="Your GitHub name"onChange={props.handlerWriteName}/>
                    <button type='submit' id="button">Search for me, slave!</button>
                </form>
            </div>
        );
    }   

export default SearchForm