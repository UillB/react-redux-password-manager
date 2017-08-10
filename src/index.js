import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard';

import registerServiceWorker from './registerServiceWorker';

import {Router, Route, browserHistory} from 'react-router';

import {Provider} from 'react-redux';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/sign-up" component={SignUp} />
                <Route path="/sign-in" component={SignIn} />  
                <Route path="/dashboard" component={Dashboard} />                                      
            </Route>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
