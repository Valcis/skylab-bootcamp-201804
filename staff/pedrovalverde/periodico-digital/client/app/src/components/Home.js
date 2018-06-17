import React from 'react';
import './home.css'
import Header from './Header'
import Categories from './Categories'
import LastNews from './LastNews'
import InfiniteScroll from 'react-infinite-scroll-component';

function Home(props) {
  return (
    <div>
      <InfiniteScroll>
        <Header />
        <Categories />
        <LastNews />
        <LastNews />
        <LastNews />
      </ InfiniteScroll>
    </div>
  )
}
export default Home;

