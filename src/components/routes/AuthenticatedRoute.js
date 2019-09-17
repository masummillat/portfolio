import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect} from "react-router";

import isAuthenticated from '../../utils/isAuthenticated';
import {Layout} from "antd";

const AuthenticatedRoute = ({layout: Layout, component: Component, ...rest }) =>{
    console.log(isAuthenticated())
    return (
        <Route
            {...rest}
            render={matchProps => isAuthenticated() ? (
                <Layout {...matchProps} {...rest}>
                    <Component {...matchProps} {...rest} />
                </Layout>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: matchProps.location}
                }}/>
            )}
        />
    );
};

AuthenticatedRoute.propTypes = {
    layout: PropTypes.func.isRequired,
    component: PropTypes.any.isRequired,
};

export default AuthenticatedRoute;
