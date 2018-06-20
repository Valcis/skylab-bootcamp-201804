import React, { Component } from 'react'
import './container.css'
import Header from './Header'
import Categories from './Categories'
import NewsGrid from './NewsGrid'

function Container(props) {
    return (
      <div className="container">
          <Header />

          <Categories />
          <NewsGrid category={props.category} />
      </div>
    )
}
export default Container;

