import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import AuthenticatedRoute from '../../routes/AuthenticatedRoute';
import { connect } from 'react-redux';

const HomeRoot = ({ getUserData ,...rest }) => {
  useEffect(()=>{
    getUserData();
  },[])
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

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDistpatchToProps = dispatch => ({
  getUserData :()=> dispatch.auth.getUserData(),
})
export default connect(mapStateToProps, mapDistpatchToProps)(HomeRoot);
