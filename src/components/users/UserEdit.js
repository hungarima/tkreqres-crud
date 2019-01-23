import React, { Component } from 'react';
import axios from 'axios';

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            name: '',
            email: '',
        }
      }

    componentDidMount() {
        axios.get('https://tk-res.herokuapp.com/api/v1/users/'+ this.props.match.params.userId)
        .then(res => {
            this.setState({
                name: res.data.name,
                email: res.data.email
            })
        })
        .catch(err => console.error(err));
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            email: this.state.email
        }
        axios.put('https://tk-res.herokuapp.com/api/v1/users/'+this.props.match.params.userId, obj)
        .then(res => console.log(res.data));
        this.props.history.push('/users');
    }
    
    
  render() {
    return (
        <div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                type="text" 
                className="form-control"
                value={this.state.name}
                onChange = {this.onChangeName}
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
                <input type="submit" value="Edit User"className="btn btn-primary"/>
              </div>
            </form>
        </div>
    );
  }
}

export default UserEdit;