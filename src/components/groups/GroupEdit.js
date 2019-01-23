import React, { Component } from 'react';
import axios from 'axios';

class GroupEdit extends Component {
    constructor(props) {
        super(props);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.onChangeMembers = this.onChangeMembers.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          name: '', 
          members: [],
        }
      }
      componentDidMount() {
        axios.get('https://tk-res.herokuapp.com/api/v1/groups/' + this.props.match.params.groupId)
        .then(res => {
          this.setState({
            name: res.data.name,
            members: res.data.members
        })
        })
        .catch(err => console.error(err));
      }
    
      onChangeGroup(e) {
        this.setState({
          name: e.target.value,
        });
      }
      onChangeMembers(e) {
        this.setState({
          members: e.target.value,
        });
      }
    
      onSubmit(e) {
        e.preventDefault();
        console.log(`The values are ${this.state.name}, ${this.state.members}` );
        const obj = {
          name: this.state.name,
          members: this.state.members
        }
        axios.post('https://tk-res.herokuapp.com/api/v1/groups', obj)
        .then(res => console.log(res.data)); 
        this.setState({
          name: '',
          members: []
        });
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
                onChange = {this.onChangeGroup}
                />
            </div>
            <div className="form-group">
                <label>Members</label>
                <input 
                type="text" 
                className="form-control"
                value={this.state.members}
                onChange = {this.onChangeMember}
                />
            </div>

            <div className="form-group">
                <input type="submit" value="Edit Group"className="btn btn-primary"/>
            </div>
          </form>
        </div>
        
    );
  }
}

export default GroupEdit;