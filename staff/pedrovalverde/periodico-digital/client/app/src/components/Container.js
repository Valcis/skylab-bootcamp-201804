import React, { Component } from 'react'
import './container.css'
import Header from './Header'
import Categories from './Categories'
import NewsItem from './NewsItem'

class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className="container">
          <Header />

          
          <Categories />
          <NewsItem path="/news/:category" />
      </div>
    )
  }
}
export default Container;

