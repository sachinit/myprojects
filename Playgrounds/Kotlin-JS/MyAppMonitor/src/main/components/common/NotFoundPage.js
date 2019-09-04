"use strict";

import React from 'react';
import { Route, NavLink } from 'react-router-dom';

class NotFoundPage extends React.Component {
    render () {
        return (
            <div>
                <h1>404</h1><h2>Page Not Found</h2>
                <p>Whoops! </p>
            </div>
        );
    }
}

export default NotFoundPage;