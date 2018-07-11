import React from 'react'
import './MainContent.css'

function MainContent(props) {
    function renderContent() {

        if (props.error) {
            return <h3 className='wrongMessage'>Insert a valid username and search info</h3>;
        } else {
            return <main>
                <section>
                {props.userInfo.name ? <h4>Name: {props.userInfo.name}</h4> : ''}
                </section>
                <figure>
                    <img src={props.userInfo.avatar_url} />
                </figure>
                <section>
                    {props.userInfo.bio ? <h4>Bio: {props.userInfo.bio}</h4> : ''}
                </section>
                <section>
                    {props.userInfo.followers ? <h4>Social: </h4> : ''}
                    {props.userInfo.followers ? <div>{props.userInfo.followers}</div> : ''}
                    {props.userInfo.followers ? <div>{props.userInfo.following}</div> : ''}
                </section>
                <section>
                    {props.userInfo.location && <h4>Location: {props.userInfo.location}</h4>}
                </section>
            </main>
        }
    }
    return renderContent()
}

export default MainContent