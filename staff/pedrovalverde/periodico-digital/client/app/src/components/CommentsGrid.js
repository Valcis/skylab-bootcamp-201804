import React, { Component } from 'react';
import './commentsGrid.css'
import { FormGroup, Label, Button, Input, FormText, Jumbotron} from 'reactstrap';

class CommentsGrid extends Component {

  render() {

    return (
      <div className="container">
      
        <Jumbotron  >
          <h3 className="display-3">Comentarios</h3>
    
          <hr className="my-2" />
          
          <FormText color="muted">
          debes registrarte para poder comentar {this.props.title}
          </FormText>

          <FormGroup>
            <Label for="exampleText">Escribte tu comentario aqui : </Label>
            <textarea id="area" name="text" rows="4" maxlength="550" />
            <Button color="secondary">comentar</Button>{' '}
          </FormGroup>

          <FormGroup>
            <Label for="exampleText">Usario : XyX hace 2 horas</Label>
            <Input disabled type="input" name="text" id="exampleText" value="esto es un supuesto comentario" />
          </FormGroup>

        </Jumbotron>

      </div>
    )
  }
}
export default CommentsGrid;