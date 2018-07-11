import React from 'react';
import './fullItemPage.css'
import Header from './Header'
import Categories from './Categories'
import FullItem from './FullItem'
import CommentsGrid from './CommentsGrid'

function FullItemPage (props) {
    
    return (
      <div className="container">
        <Header />
        <Categories actived={props.category}/>
        <FullItem category={props.category} newsId={props.newsId} />
        <CommentsGrid />
      </div>
    )
  
}
export default FullItemPage;