import React from 'react';
import ApplicationListRow from './ApplicationListRow';
import PropTypes from 'prop-types';

const ApplicationList = ({apps}) => {
    return (
      <div>  
        {apps.map(app => <ApplicationListRow key={app.id} app={app} />)}
</div>
    );
};

ApplicationList.propTypes = {
    apps: PropTypes.array.isRequired
};


export default ApplicationList;