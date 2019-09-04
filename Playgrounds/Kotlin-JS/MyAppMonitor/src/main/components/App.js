import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './common/Header.js';
import Footer from './common/Footer.js';
import NotFoundPage from './common/NotFoundPage';

import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';

import { 
  Grid,
  Row,
  Col,
  Clearfix
} from 'react-bootstrap';

class App extends React.Component {
  render () {
    return (
      <div>
        <Header loading={this.props.loading} />
        <div className="container-fluid row-m-t ">
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Col>
             <Clearfix visibleSmBlock></Clearfix>
          </Row>
        </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}
export default connect(mapStateToProps)(App);