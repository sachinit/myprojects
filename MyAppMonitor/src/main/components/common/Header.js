import React from 'react';
import PropTypes from 'prop-types';

import { 
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Button,
  Glyphicon
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingDots from './LoadingDots';
import toastr from 'toastr';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh () {
    // let socket = io();
    // socket.emit('loadmonitor');
    toastr.success();
  }

  render() {
    return (
      <Navbar fluid collapseOnSelect fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to="/">
        <a  href="#">Application Monitoring</a>
        </LinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Text>
        <Button bsSize="xs" bsStyle="link" onClick={this.onRefresh}>
          <Glyphicon glyph="refresh" /> Refresh
        </Button>
        {this.props.loading && <LoadingDots interval={100} dots={20} /> }
      </Navbar.Text>
      <Nav pullRight>
        <LinkContainer to="/about">
        <NavItem eventKey={2}>About</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    );
  }
}

Header.propType = {
  loading: PropTypes.bool.isRequired
};

export default Header;