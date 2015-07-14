import React from 'react';
import { RouteHandler } from 'react-router';

class AppHandler extends React.Component {
    static contextTypes = {
        router: React.PropTypes.func
    };

    render() {
        return (
            <div>
                 <RouteHandler {...this.props} />
            </div>
        );
    }
}


export default AppHandler;
