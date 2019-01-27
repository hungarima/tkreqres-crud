import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link, withRouter } from 'react-router-dom';


import Example from './components/example/Example';
import User from './components/users/User';
import Group from './components/groups/Group';
import UserEdit from './components/users/UserEdit';
import GroupEdit from './components/groups/GroupEdit'; 


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbara-light bg-light">
          <Link to="/" className="navbar-brand">React CRUD</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/examples" className="nav-link">Examples</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">Users</Link>
              </li>
              <li className="nav-item">
                <Link to="/groups" className="nav-link">Groups</Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/spec" className="nav-link">Specification</Link>
              </li> */}
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/examples" exact component={Example} />
          <Route exact path="/users" component={User}/>
          <Route exact path="/groups" component={Group} />
          <Route path="/users/:userId" component={UserEdit} />
          <Route path="/groups/:groupId" component={GroupEdit}/>

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
