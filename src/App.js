import React from 'react';
import  {history} from './store';
import get from 'lodash/get';
import {ConnectedRouter as Router} from "connected-react-router";
import {Switch} from "react-router";
import routes from './routes';
import 'antd/dist/antd.css';
import PublicRoute from "./components/routes/PublicRoute";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";

function App() {
  return (
          <Router history={history}>
              <Switch>
                  {
                      routes.map((route,i)=>
                        get(route, 'authenticated', true) ?
                           <AuthenticatedRoute
                               key={i}
                               path={route.path}
                               exact={route.exact}
                               layout={route.layout}
                               component={route.component}
                               route={route}
                           />
                            : (
                                <PublicRoute
                                    key={i}
                                    path={route.path}
                                    exact={route.exact}
                                    layout={route.layout}
                                    component={route.component}
                                />
                            )
                      )
                  }
              </Switch>
          </Router>
  );
}


export default App;
