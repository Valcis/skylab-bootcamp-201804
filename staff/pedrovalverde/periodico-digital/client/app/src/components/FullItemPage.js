import React, { Component } from 'react';
import './fullItemPage.css'
import Header from './Header'
import Categories from './Categories'
import FullItem from './FullItem'
import CommentsGrid from './CommentsGrid'

class FullItemPage extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        <Categories />
        <FullItem actualNews={this.props.actualNews} category={this.props.category} title={this.props.title} />
        <CommentsGrid data={this.props.actualNews}/>

      </div>
    )
  }
}
export default FullItemPage;