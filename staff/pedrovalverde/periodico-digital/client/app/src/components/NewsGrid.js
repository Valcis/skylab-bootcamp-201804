import React, { Component } from 'react'
import './newsGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logic from '../logic/index'
import { Card, CardImg, CardText, CardBody, CardLink, CardHeader, CardFooter, CardTitle, CardSubtitle, Button } from 'reactstrap';

class NewsItem extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    items: {},
    feed: {},
  }

  componentDidMount() {
    this.loadNews(this.props.category)
  }

  componentWillReceiveProps(props) {    
    this.loadNews(props.category)
  }

  loadNews(category) {
    logic.news.getNews(category)
      .then(data => {
        if (data.status == 'ok') {
          this.setState({
            items: data.items,
            feed: data.feed,
          })
        }
      })
  }

  render() {

    let items = []

    for (const key in this.state.items) {
      if (this.state.items.hasOwnProperty(key)) {

        items[key] = <Card className="card">
          <CardHeader className="cardHeader">abc.es</CardHeader>
          <CardImg class="images" src={this.state.items[key].thumbnail} alt="Card image cap" />
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">{this.state.items[key].title}</CardTitle>
            <CardSubtitle className="cardSubtitle">autor : {this.state.items[key].author}</CardSubtitle>
            <CardText className="cardText">ultima actualizacion : {this.state.items[key].pubDate} .</CardText>
            <CardLink href="#">Card Link</CardLink>
          </CardBody>
        </Card>;
      }
    }


    return (
      <div className="newsItem">

        {items}

      </div>
    );
  }
};


export default NewsItem;