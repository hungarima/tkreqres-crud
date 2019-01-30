import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class GroupDetail extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    

    delete() {
        axios.delete('https://tk-res.herokuapp.com/api/v1/groups/'+ this.props.list._id)
        .then(() =>{
            console.log('Deleted');
        })
        .catch(err => console.error(err));
    }

    members() {
        return this.props.list.members.map(function(member, i) {
            return `${i+1}. ${member}\n`
        })
    }
  render() {
    return (
        <tr >
        <td >{this.props.index+1}</td>
        <td>{this.props.list.name}</td>
        <td className="newline">{this.members()}</td>
        <td>
        <Link to={"/groups/"+this.props.list._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </td>
    </tr>
    );
  }
}

export default GroupDetail;