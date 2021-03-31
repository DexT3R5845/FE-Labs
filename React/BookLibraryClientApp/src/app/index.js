import React from 'react'
import { HashRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import Master from './master'
import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Master>
                    {routes.map((route)=> {
                        return <Route key={route.key} path={route.path} component={route.component} exact={route.exact} />;
                    })}
                </Master>
            </Router>
        </Provider>
    );
}

export default App;