import React, { Component } from 'react';
import axios from 'axios';

let members = [];

class GroupEdit extends Component {
    constructor(props) {
        super(props);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
    
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
        members = this.state.members;
        console.log(members);
        
        })
        .catch(err => console.error(err));
      }
    
      onChangeGroup(e) {
        this.setState({
          name: e.target.value,
        });
      }

      groupEditRow() {
        return this.state.members.map((member,index) => 
          <input
          type="text"
          className="form-control"
          value = {member._id}
          name= {index}
          onChange= {this.handleChange}
          placeholder={index}
          />
        
         
        )
      }

    
      onSubmit(e) {
        e.preventDefault();
        const newMembers = this.state.members.map((member) => {
          return member._id
        })

        const obj = {
          name: this.state.name,
          members: newMembers
        }
        console.log(obj)
        axios.put('https://tk-res.herokuapp.com/api/v1/groups/'+ this.props.match.params.groupId, obj)
        .then(res => console.log(res.data)); 
        this.setState({
          name: '',
          members: []
        });
      }

      handleChange(e) {
        console.log(e.target.name + " " + e.target.value)
        let members = this.state.members.slice()
        console.log(members)
        for (let i in members) {
          if (i === e.target.name) {
            members[i]._id = e.target.value
            this.setState({members})
            console.log(this.state.members);
            break;
          }
        }
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
                {this.groupEditRow()}
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