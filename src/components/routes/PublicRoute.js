import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PublicRoute = ({ layout: Layout, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={matchProps => (
                <Layout>
                    <Component {...matchProps} />
                </Layout>
            )}
        />
    );
};

PublicRoute.propTypes = {
    layout: PropTypes.func.isRequired,
    component: PropTypes.any.isRequired,
};

export default PublicRoute;
