import React, { Component } from 'react'
import './landingPage.css'
import Header from './Header'
import Categories from './Categories'
import NewsGrid from './NewsGrid'

function LandingPage(props) {
    return (
      <div className="container">
          <Header />
          <Categories />
          <NewsGrid setActualNews={props.setActualNews} category={props.category} />
      </div>
    )
}
export default LandingPage;

