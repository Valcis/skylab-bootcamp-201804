import React, { Component } from 'react';
import './fullItemPage.css'
import Header from './Header'
import Categories from './Categories'
import FullItem from './FullItem'

function FullItemPage(props) {
  return (
    <div className="container">
      <Header />
      <Categories />
      <FullItem actualNews={props.actualNews}  category={props.category} title={props.title} datos={props} />
    </div>
  )

}
export default FullItemPage;