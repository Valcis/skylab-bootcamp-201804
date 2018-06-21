import React, { Component } from 'react'
import './newsGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logic from '../logic/index'
import { TabContent, TabPane, Card, CardImg, CardBody, CardLink, CardHeader, CardTitle } from 'reactstrap';

class NewsGrid extends Component {

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

        let _title = encodeURI(this.state.items[key].title)
        let _href = "/#/news/"+this.props.category+"/"+_title;

          items[key] = 
          <TabPane tabId={this.props.category}>
          <Card>
            {<CardHeader><span>ultima actualizacion : {this.state.items[key].pubDate}</span><span>ABC</span></CardHeader>}
            <CardLink  href={_href} >
            <CardImg class="images" src={this.state.items[key].thumbnail} alt="Card image cap" />
            <CardBody className="cardBody">
              <CardTitle className="cardTitle">{this.state.items[key].title}</CardTitle>
            </CardBody>
          </CardLink>
        </Card >
        </TabPane>
      }
    }


    return (
      <div className="newsItem">
      <TabContent activeTab={this.props.category}>
        {items}
        </TabContent>
      </div>
    );
  }
};


export default NewsGrid;