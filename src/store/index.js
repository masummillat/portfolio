import { init } from '@rematch/core';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import models from '../models';

export const history = createBrowserHistory();

const reactRouterMiddleware = routerMiddleware(history);

const reducers = { router: connectRouter(history) };

const middlewares = [
    reactRouterMiddleware,
    // logger
];
const store = init({
    models,
    redux:{
        reducers
    }
});

export default store;