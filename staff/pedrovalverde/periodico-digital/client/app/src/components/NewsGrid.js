import React, { Component } from 'react'
import './newsGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logic from '../logic/index'
import { Card, CardImg, CardText, CardBody, CardLink, CardHeader, CardTitle } from 'reactstrap';

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
        console.log('data: ', data);
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


        
        items[key] = <Card>
          {<CardHeader><span>ultima actualizacion : {this.state.items[key].pubDate}</span><span>{this.state.items[key].author}</span></CardHeader>}
          <CardLink href="#" >
          <CardImg class="images" src={this.state.items[key].thumbnail} alt="Card image cap" />
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">{this.state.items[key].title}</CardTitle>
          </CardBody>
          </CardLink>
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