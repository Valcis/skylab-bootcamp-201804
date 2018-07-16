import React, { Component } from 'react'
import './fullItem.css'
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import logic from '../logic/index'
import { TabContent, TabPane, Card, CardText, CardBody, CardLink, CardTitle, CardFooter } from 'reactstrap';

class FullItem extends Component {

  state = {
    itemId: this.props.newsId,
    item: '',
    contenidoo: ''
  }

  componentWillMount() {
    logic.news.getNewsById(this.props.newsId)
      .then(item => {
        this.setState({
          item: item.data,
          contenidoo: item.data.content.replace(/<[^>]*>?/g, ''),
        })
      })
  }

  render() {
    
    return (
      <TabContent className="tc-itemPage" activeTab={this.props.category}>
        <TabPane tabId={this.props.category}>
          <Card>
            <CardBody>
              <CardTitle id="cardtitle">{this.state.item.title}</CardTitle>

            </CardBody>

            <CardBody className="item-card">
              <img width="50%" src={this.state.item.picture} alt="no one" />
              <CardText>{this.state.contenidoo}</CardText>
              <CardLink href="#">add to favorite</CardLink>
              <CardLink href="#">comment</CardLink>
            </CardBody>
            <CardFooter><span>last update : {this.state.item.pubDate}</span><span>ABC</span></CardFooter>
          </Card>
        </TabPane>
      </TabContent>
    );
  }
};


export default withRouter(FullItem);