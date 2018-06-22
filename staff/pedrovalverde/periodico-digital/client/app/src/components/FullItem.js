import React, { Component } from 'react'
import './fullItem.css'
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import logic from '../logic/index'
import { TabContent, TabPane, Card, CardText, CardBody, CardLink, CardTitle, CardFooter } from 'reactstrap';
class FullItem extends Component {

  state = {
    actualNews: this.props.actualNews,
    contenido: ''
  }

  componentDidMount() {
    //console.log("did Mount pubdate :", this.state.actualNews.pubDate)
  }

  componentWillMount() {
    if (Object.keys(this.state.actualNews).length == 0) {
      //this.props.history.push('/')
      console.log("entro a willmount");
      
      logic.news.exist("2222-22-22 22:22:22").then(res =>
        console.log("el res : ", res)
      )
        .catch((err) =>
          console.log(err)
    )

      this.setState({

        actualNews: {
          title: "TITULO DE CONTENIDO CUANDO NO HAY NOTICIA ",
          pubDate: "2222-22-22 2:22:22",
          thumbnail: "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
          content: "contenido de prueba , contenido de prueba , contenido de prueba , contenido de prueba , contenido de prueba",
          link: "http://www.abc.es/internacional/abci-req180621noticia.html",
          guid: "http://www.abc.es/internacional/abci-requisitobrexit-201806211540_noticia.html",
          author: "(boot)",
        },
        contenido: "contenido de prueba , contenido de prueba , contenido de prueba , contenido de prueba",
      })


    } else {
      let contenido = this.state.actualNews.content
      this.setState({
        contenido: contenido.replace(/<[^>]*>?/g, '')
      })
    }
  }

  render() {
    return (
      <TabContent activeTab={this.props.category}>
        <TabPane tabId={this.props.category}>
          <Card>
            <CardBody>
              <CardTitle id="cardtitle">{this.state.actualNews.title}</CardTitle>

            </CardBody>

            <CardBody className="item-card">
              <img width="50%" src={this.state.actualNews.thumbnail} alt="Card image cap" />
              <CardText>{this.state.contenido}</CardText>
              <CardLink href="#">add to favorite</CardLink>
              <CardLink href="#">comment</CardLink>
            </CardBody>
            <CardFooter><span>last update : {this.state.actualNews.pubDate}</span><span>ABC</span></CardFooter>
          </Card>
        </TabPane>


      </TabContent>
    );
  }
};


export default withRouter(FullItem);