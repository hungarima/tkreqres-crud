import React, { Component } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';

class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user: '', 
      email: '',
      users: []
    }
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(`The values are ${this.state.user}, ${this.state.email}` );
    const obj = {
      name: this.state.user,
      email: this.state.email
    }
    axios.post('https://tk-res.herokuapp.com/api/v1/users', obj)
    .then(res => console.log(res.data)); 
    this.setState({
      user: '',
      email: ''
    });
  }

  userRow() {
    return this.state.users.map(function(list, i) {
      return <UserDetail list ={list} index={i} />;
    })
  }

  componentDidMount() {
    axios.get('https://tk-res.herokuapp.com/api/v1/users')
    .then(data => this.setState({users: data.data}))
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
          <h1>User Component</h1>
          <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  { this.userRow()}
                </tbody>
              </table>
            </div>

            <h3>Add new User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                type="text" 
                className="form-control"
                value={this.state.user}
                onChange = {this.onChangeUser}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                type="text" 
                className="form-control"
                value={this.state.email}
                onChange = {this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Add User"className="btn btn-primary"/>
              </div>
            </form>
      </div>
    );
  }
}

export default User;