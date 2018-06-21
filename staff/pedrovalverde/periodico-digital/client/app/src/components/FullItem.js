import React, { Component } from 'react'
import './newsGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logic from '../logic/index'
import { Card, CardImg, CardBody, CardLink, CardHeader, CardTitle } from 'reactstrap';

class FullItem extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    items: {},
    feed: {},
  }

  componentDidMount() {
    //this.loadNews(this.props.category)
  }

  componentWillReceiveProps(props) {
    //this.loadNews(props.category)
  }

  /* loadNews(category) {
    logic.news.getNews(category)
      .then(data => {
        console.log('data: ', data);
        if (data.status == 'ok') {
          this.setState({
            items: data.items,
            feed: data.feed,
          })
        }
      })
  } */

  render() {

console.log("toda la noticia : ",this.props);
    return (
      <div className="newsItem">
      
       
      </div>
    );
  }
};


export default FullItem;