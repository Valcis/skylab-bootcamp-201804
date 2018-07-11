import React, { Component } from 'react'
import img_default from './../default.jpg';
import './newsGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logic from '../logic/index'
import { TabContent, TabPane, Card, CardImg, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'

class NewsGrid extends Component {

  state = {
    comboNews: {},
    feed: {},
    category: this.props.category

  }

  componentDidMount() {
    this.loadNewsFromExternAPI(this.props.category)
  }

  componentWillReceiveProps(props) {
    this.loadNewsFromExternAPI(props.category)
  }

  loadNewsFromExternAPI(category) {
    logic.news.getExternNews(category)
      .then(data => {
        if (data.status === 'ok') {
          this.setState({
            comboNews: data.items,
            feed: data.feed,
          })
        }
      })
  }

  saveItemOnBBDD(itemObject) {
    logic.news.saveItem(itemObject)
  }

  render() {

    let items = []

    for (const key in this.state.comboNews) {
      if (this.state.comboNews.hasOwnProperty(key)) {
        let _pubDate = this.state.comboNews[key].pubDate
        let newsId = _pubDate.replace(/[- :]/gi, '');
        let _title = encodeURIComponent(this.state.comboNews[key].title)
        let _href = "/news/" + this.props.category + "/" + newsId + "/" + _title;
        let _src = this.state.comboNews[key].thumbnail === '' ? img_default : this.state.comboNews[key].thumbnail

        // si el pubDate de esas noticias no esta en mi BBDD , entonces que la guarde:
        logic.news.existItem(newsId)
          .then(item => {
            if (!item) {
              this.saveItemOnBBDD(this.state.comboNews[key])
            }
          })

        items[key] =
          <TabPane key={"tb" + key} tabId={this.props.category}>
            <Card>
              {<CardHeader><span>last update : {this.state.comboNews[key].pubDate}</span><span>ABC</span></CardHeader>}
              <Link to={_href}>
                <CardImg src={_src} alt="Card image cap" />
                <CardBody >
                  <CardTitle >{this.state.comboNews[key].title}</CardTitle>
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