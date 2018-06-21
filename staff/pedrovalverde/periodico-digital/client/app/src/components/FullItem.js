import React, { Component } from 'react'
import './fullItem.css'
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import logic from '../logic/index'
import { FormGroup, Label, Input, FormText,Jumbotron, TabContent, TabPane, Card, CardText, CardBody, CardLink, CardTitle, CardFooter } from 'reactstrap';
class FullItem extends Component {

  state = {
    items: {},
    feed: {},
    actualNews: this.props.actualNews,
    contenido: ''
  }

  componentWillMount() {
    if (Object.keys(this.state.actualNews).length == 0) {
      this.props.history.push('/')
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
          <CardBody  >
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

        <Jumbotron>
        <h3 className="display-3">Comentarios</h3>
        <p className="lead">Deja tu comentario en esta noticia.</p>
        <hr className="my-2" />

        <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
        
        <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
        
        <FormGroup>
          <Label for="exampleText">Usario : XyX hace 2 horas</Label>
          <Input disabled type="input" name="text" id="exampleText" value="esto es un supuerto comentario" />
        </FormGroup>

        
        <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
      </Jumbotron>
        </TabContent>
        );
      }
    };
    
    
export default withRouter(FullItem);