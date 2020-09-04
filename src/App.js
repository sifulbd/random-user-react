import React from 'react';
import './App.css';
import Users from './Components/Users/Users';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
} from "react-router-dom";
import Home from './Components/Home/Home';
import UserDetails from './Components/UserDeatils/UserDetails';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul className="nav justify-content-center" >
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path={`/user/:keyId`}> 
              <UserDetails></UserDetails>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="*">
              <h3>404 Nothing is here</h3>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
