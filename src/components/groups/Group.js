import React, { Component } from 'react';
import axios from 'axios';
import GroupDetail from './GroupDetail';
class Group extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onChangeMembers = this.onChangeMembers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      name: '', 
      members: [],
      groups: []
    }
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
    console.log(`The values are ${this.state.user}, ${this.state.email}` );
    const obj = {
      name: this.state.name,
      member: this.state.member
    }
    axios.post('https://tk-res.herokuapp.com/api/v1/groups', obj)
    .then(res => console.log(res.data)); 
    this.setState({
      name: '',
      members: []
    });
  }

  groupRow() {
    return this.state.groups.map(function(list, i) {
      return <GroupDetail list = {list} index={i} />;
    })
  }


  componentDidMount() {
    axios.get('https://tk-res.herokuapp.com/api/v1/groups')
    .then(data => this.setState({groups: data.data}))
    .catch(err => console.error(err));
  }
  render() {
    return (
      <div>
          <h1>Group Component</h1>
          <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Members</th>
                    <th colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  { this.groupRow()}
                </tbody>
              </table>
            </div>

            <h3>Add new Group</h3>
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
                onChange = {this.onChangeMember}
                />
                <div>
                </div>
                
              </div>
              
              <div className="form-group">
                <input type="submit" value="Add Group"className="btn btn-primary"/>
              </div>
            </form>
      </div>
    );
  }
}

export default Group;