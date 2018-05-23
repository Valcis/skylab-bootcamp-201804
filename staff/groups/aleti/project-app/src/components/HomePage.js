import React, { Component } from 'react';
import { render } from "react-dom";
import './HomePage.css';
import { Grid, Row, Col, Thumbnail} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import logic from '../logic'
import InfiniteScroll from 'react-infinite-scroll-component';
import fav1  from '../images/favorite-1.png'
import fav2  from '../images/favorite-2.png'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { FormGroup, FormControl } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import swal from 'sweetalert2'

class HomePage extends Component {
  state = {
    movies: {},
    value: '',
    page: 2,
    username: '',
    id: '',
    token: '',
    user: {},
    key: 'c9e81d7384a0e7aa9d0deecb8c80c2cc',
  }

  fetchMoreData = () => {
    logic.movie.getMoviesPopular(this.state.key, this.state.page)
      .then(data => {
        this.setState({
          page: this.state.page + 1,
          movies: {
            ...this.state.movies,
            results: [
              ...this.state.movies.results,
              ...data.results
            ]
          }
        })
      })
  };

  componentDidMount(props) {
  
    const username = localStorage.getItem('userName')
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    if (localStorage.getItem('userName')){
        this.setState({
          username: username,
          id: id,
          token: token
        })

        logic.user.retrieveUser(id, token)
        .then(res => {
          this.setState({
            user: res.data
          })
        })
    }
    logic.movie.getMoviesPopular(this.state.key)
      .then(data => {
        this.setState({
          movies: data
        })
      })
  }


  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

      

  handleChangeFav = (e, movieId, isFavorite) => {

    //TODO if is not logged in redirect to login

    if(this.state.token){

      if (isFavorite < 0) {
        e.target.src = fav2
        let body = {}
        if (typeof this.state.user.favoriteMovies !== 'undefined') {
          body = {
            username: this.state.username, 
            password: localStorage.getItem('password'), 
            favoriteMovies: [...this.state.user.favoriteMovies, movieId]
          }
          const { user } = this.state;
          this.setState({
            user: {
                ...user,
                favoriteMovies: [...this.state.user.favoriteMovies, movieId]
            }
          });

        } else {
          body = {
            username: this.state.username, 
            password: localStorage.getItem('password'), 
            favoriteMovies: [movieId]
          }
          const { user } = this.state;
          this.setState({
            user: {
                ...user,
                favoriteMovies: [movieId]
            }
          });
        }

        logic.user.updateUser(body, this.state.id, this.state.token)
        .then(data => data)
      } 

    } else {

      swal({
        type: 'warning',
        title: 'You must be loged first!',
        text: ''
      })

    }


  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(this.state.value){
      logic.movie.searchMulti(this.state.key, this.state.value)
      .then(data=>{
        this.setState({
          movies:data
        })
      })
    } else {
      logic.movie.getMoviesPopular(this.state.key)
        .then(data => {
          this.setState({
            movies: data
          })
        })
    }
  }


  handleLogoutUser() {
    localStorage.setItem('token', '')
    localStorage.setItem('id', '')
    localStorage.setItem('userName', '')
    this.setState({
      username: ''
    })
  }

  render() {
    return (

      <div className="content-home">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">Movies&TV-LAV</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              {/* <LinkContainer to="/" onClick={this.handleLogoutUser}>
                <NavItem eventKey={1}>Series</NavItem>
              </LinkContainer>
              <LinkContainer to="/" onClick={this.handleLogoutUser}>
                <NavItem eventKey={2}>Movies</NavItem>
              </LinkContainer> */}
              { this.state.username ?
                <NavDropdown title={localStorage.getItem('userName')} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavItem>Profile</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login" onClick={this.handleLogoutUser}>
                    <NavItem>Logout</NavItem>
                  </LinkContainer>
                </NavDropdown>
                : 
                <Nav>
                  <LinkContainer to="/login" >
                    <NavItem>login</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/register" >
                    <NavItem>register</NavItem>
                  </LinkContainer>
                </Nav>
              }
            </Nav>
            <Navbar.Form pullRight>
              <FormGroup>
                  <FormControl className='input' type="text" placeholder="Search" onChange={this.handleChange} value={this.state.value} />
              </FormGroup>{' '}
              <Button onClick={this.handleSubmit} type="submit">Submit</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <div>
          <InfiniteScroll
            dataLength={this.state.movies.results ? this.state.movies.results.length : 0}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <Grid>
              <Row>
                {this.state.movies.results && (
                  this.state.movies.results.map(movie => {
                    let isFavorite = -1
                    let image

                    if (typeof this.state.user !== 'undefined' && typeof this.state.user.favoriteMovies !== 'undefined') {
                      isFavorite = this.state.user.favoriteMovies.indexOf(movie.id)
                      isFavorite > 0 ? image = fav2 : image = fav1
                    } else {
                      image = fav1
                    }

                    return (
                      <Col xs={12} sm={6} md={3} key={movie.id} >
                        <Thumbnail src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} >
                          <h4>{movie.original_title} 
                          <span className='fav'>
                          <img onClick={ (e) => this.handleChangeFav(e, movie.id, isFavorite)} 
                           src={image} className='favorite'/></span></h4>
                        </Thumbnail>
                      </Col>
                    )
                  })
                )}
              </Row>
            </Grid>
          </InfiniteScroll>
        </div>
      </div>
    );
  }

}

export default withRouter(HomePage);
