import React, { Component } from 'react';
import axios from 'axios';
import GroupDetail from './GroupDetail';

const ParentComponent = (props) => <div>
    <div id="children-pane">
      {props.children}
    </div>
    <p><a href="#" onClick={props.addChild}>Add another Member</a></p>  
  </div>


const ChildComponent = (props) => <div>
    <input 
        type="text" 
        className="form-control"
        name= {props.number}
        onChange = {props.handleChange}
    />
</div>;
const members = [];

class Group extends Component {
  
  constructor(props) {
    super(props);
    
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onAddChild = this.onAddChild.bind(this);
    this.handleChange = this.handleChange.bind(this);

    
    this.state = {
      name: '', 
      groups: [],
      numChildren: 0
    }
  }

  onChangeGroup(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onSubmit(e) {

    e.preventDefault();
    const obj = {
      name: this.state.name,
      members: members
    }
    console.log(obj)
    axios.post('https://tk-res.herokuapp.com/api/v1/groups', obj)
    .then(res => console.log(res.data)); 
    this.setState({
      name: ''
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

  onAddChild() {
    this.setState({
      numChildren: this.state.numChildren + 1
    });
  }

  handleChange(e) {
    
    members[e.target.name] = e.target.value;
  }

  

  

  render() {
    const children = [];
    for (var i = 0; i < this.state.numChildren; i++) {
      children.push(<ChildComponent handleChange ={this.handleChange} key ={i} number ={i} />);
    };
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
                <ParentComponent addChild={this.onAddChild}>
                  {children}
                </ParentComponent>
                
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