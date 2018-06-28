import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

import * as loadActions from '../../actions/LoadActions';
import ApplicationList from './ApplicationList';

//import Notifier from '../common/Notifier.js';

export class HomePage extends React.Component {
  
  constructor(props, context) {
        super(props, context);
  }
      
  render () {
    const {apps} = this.props;

    return (
      <div>
        <ApplicationList apps={apps} />
      </div>
    );
  }
}

HomePage.propTypes = {
  apps: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        apps: state.apps
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loadActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);