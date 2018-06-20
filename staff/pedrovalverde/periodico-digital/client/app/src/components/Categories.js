import React, { Component } from 'react'
import './categories.css'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'


class Categories extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    dropdownOpen: false,
    isActived: false
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  render() {
    return (

      <div className="categories">
        <Nav tabs>
          <NavItem className="navItem">
            <NavLink className="navLink" tag={Link} to="/news/introduction" active={this.state.isActived}>Portada</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" tag={Link} to="/news/international" active={this.state.isActived}>Internacional</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" tag={Link} to="/news/spain" active={this.state.isActived}>España</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" tag={Link} to="/news/culture" active={this.state.isActived}>Cultura</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" tag={Link} to="/news/politics" active={this.state.isActived}>Politica</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" tag={Link} to="/news/sports" active={this.state.isActived}>Deportes</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" tag={Link} to="/news/economy" active={this.state.isActived}>Economia</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" tag={Link} to="/news/tecnology" active={this.state.isActived}>Tecnologia</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" tag={Link} to="/news/health" active={this.state.isActived}>Salud</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }

}
export default Categories;