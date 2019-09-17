import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const HomeRoute = ({ layout: Layout, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={matchProps => (
                <Layout {...rest}>
                    <Component {...matchProps} {...rest} />
                </Layout>
            )}
        />
    );
};

HomeRoute.propTypes = {
    layout: PropTypes.func.isRequired,
    component: PropTypes.any.isRequired,
};

export default HomeRoute;
