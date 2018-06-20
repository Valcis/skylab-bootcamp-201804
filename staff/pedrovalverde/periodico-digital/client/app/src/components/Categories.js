import React, { Component } from 'react'
import './categories.css'
import { Nav, NavItem, NavLink } from 'reactstrap';


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
            <NavLink className="navLink"  href="/home/" active={true}>Portada</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" category="international" href="/news/internacional/">Internacional</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" href="/news/nacional/">Nacional</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" href="/news/barcelona/">Barcelona</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" href="/news/politica/">Politica</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" category="sports" href="/news/deportes/">Deportes</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" href="/news/economia/">Economia</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" href="/news/tecnologia/">Tecnologia</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navLink" href="/news/actualidad/">Actualidad</NavLink>
          </NavItem>
          
         
        </Nav>
      </div>
    );
  }

}
export default Categories;