import React, { Component } from 'react';
import './fullItemPage.css'
import Header from './Header'
import Categories from './Categories'
import FullItem from './FullItem'

function FullItemPage(props) {
  console.log("props de pagina ", props);
  return (
    <div className="container">
      <Header />
      <Categories />
      <FullItem category={props.category} title={props.title} data="hola" />
    </div>
  )

}
export default FullItemPage;