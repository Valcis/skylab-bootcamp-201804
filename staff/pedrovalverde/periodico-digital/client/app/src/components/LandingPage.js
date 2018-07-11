import React from 'react'
import './landingPage.css'
import Header from './Header'
import Categories from './Categories'
import NewsGrid from './NewsGrid'

function LandingPage(props) {

    return (
      <div className="container">
          <Header />
          <Categories actived={props.category}/>
          <NewsGrid category={props.category} />
      </div>
    )
}
export default LandingPage;

