import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/home">Home</Link>
                </nav>

                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={Home} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
