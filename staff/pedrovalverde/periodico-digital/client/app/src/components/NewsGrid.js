import React, { Component } from 'react'
import './newsGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logic from '../logic/index'
import { TabContent, TabPane, Card, CardImg, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'

class NewsGrid extends Component {
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
        let _href = "/news/" + this.props.category + "/" + _title;

        items[key] =
          <TabPane key={"tb" + key} tabId={this.props.category}>
            <Card>
              {<CardHeader><span>last update : {this.state.items[key].pubDate}</span><span>ABC</span></CardHeader>}

              <Link to={_href} onClick={() => {
                this.props.setActualNews(this.state.items[key])
              }}>
                <CardImg src={this.state.items[key].thumbnail} alt="Card image cap" />
                <CardBody >
                  <CardTitle >{this.state.items[key].title}</CardTitle>
                </CardBody>
              </Link>
            </Card >
          </TabPane>
      }
    }


    return (

      <TabContent className="tc-grid" activeTab={this.props.category}>
        {items}
      </TabContent>

    );
  }
};


export default NewsGrid;