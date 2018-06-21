import React, { Component } from 'react'
import './categories.css'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'
import classnames from 'classnames';


class Categories extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'introduction'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return (

      <div className="categories">
        <Nav tabs>
          <NavItem >
            <NavLink tag={Link} to="/news/introduction" className={classnames({ active: this.state.activeTab === 'introduction' })}  onClick={() => { this.toggle('introduction'); }}>Portada</NavLink>
          </NavItem>
          <NavItem >
            <NavLink tag={Link} to="/news/international" className={classnames({ active: this.state.activeTab === 'international' })}  onClick={() => { this.toggle('international'); }}>Internacional</NavLink>
          </NavItem>
          <NavItem >
            <NavLink tag={Link} to="/news/spain" className={classnames({ active: this.state.activeTab === 'spain' })}  onClick={() => { this.toggle('spain'); }}>España</NavLink>
          </NavItem>
          <NavItem >
            <NavLink tag={Link} to="/news/culture" className={classnames({ active: this.state.activeTab === 'culture' })}  onClick={() => { this.toggle('culture'); }}>Cultura</NavLink>
          </NavItem>
          <NavItem >
            <NavLink tag={Link} to="/news/politics" className={classnames({ active: this.state.activeTab === 'politics' })}  onClick={() => { this.toggle('politics'); }}>Politica</NavLink>
          </NavItem>
          <NavItem >
            <NavLink tag={Link} to="/news/sports" className={classnames({ active: this.state.activeTab === 'sports' })}  onClick={() => { this.toggle('sports'); }}>Deportes</NavLink>
          </NavItem>
          <NavItem >
            <NavLink tag={Link} to="/news/economy" className={classnames({ active: this.state.activeTab === 'economy' })}  onClick={() => { this.toggle('economy'); }}>Economia</NavLink>
          </NavItem>
          <NavItem >
            <NavLink tag={Link} to="/news/tecnology" className={classnames({ active: this.state.activeTab === 'tecnology' })}  onClick={() => { this.toggle('tecnology'); }}>Tecnologia</NavLink>
          </NavItem>
          <NavItem >
            <NavLink tag={Link} to="/news/health" className={classnames({ active: this.state.activeTab === 'health' })}  onClick={() => { this.toggle('health'); }}>Salud</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }

}
export default Categories;