import React, { Component } from 'react'
import './categories.css'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'


class Categories extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
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
            <NavLink className="navLink" tag={Link} to="/news/introduction">Portada</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <Link className="navLink" to="/news/international">Internacional</Link>
          </NavItem>
          <NavItem className="navItem">
            <Link className="navLink" to="/news/national">Nacional</Link>
          </NavItem>
          <NavItem className="navItem">
            <Link className="navLink" to="/news/barcelona">Barcelona</Link>
          </NavItem>
          <NavItem className="navItem">
            <Link className="navLink" to="/news/politica">Politica</Link>
          </NavItem>
          <NavItem className="navItem">
            <Link className="navLink" to="/news/sports">Deportes</Link>
          </NavItem>
          <NavItem className="navItem">
            <Link className="navLink" to="/news/economia">Economia</Link>
          </NavItem>
          <NavItem className="navItem">
            <Link className="navLink" to="/news/tecnologia">Tecnologia</Link>
          </NavItem>
          <NavItem className="navItem">
            <Link className="navLink" to="/news/actualidad">Actualidad</Link>
          </NavItem>


        </Nav>
      </div>
    );
  }

}
export default Categories;