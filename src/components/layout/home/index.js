import React from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import AuthenticatedRoute from '../../routes/AuthenticatedRoute';

const HomeRoot = ({ ...rest }) => {
    return (
        <div>
            <Router history={rest.history}>
                <Switch>
                    {rest.route.children.map((route, i) => {
                        return (
                            <AuthenticatedRoute
                                key={i}
                                path={route.path}
                                exact={route.exact}
                                layout={route.layout}
                                component={route.component}
                                route={route}
                            />
                        );
                    })}
                </Switch>
            </Router>
        </div>
    );
};
export default HomeRoot;
