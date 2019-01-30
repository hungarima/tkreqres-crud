import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        axios.delete('https://tk-res.herokuapp.com/api/v1/users/'+ this.props.list._id)
        .then(() => {
            console.log('Deleted');
    })
        .catch(err => console.error(err));
        
    }
  render() {
    return (
        
        <tr>
            <td>{this.props.index + 1}</td>
            <td>{this.props.list.name}</td>
            <td>{this.props.list.email}</td>
            <td>
            <Link to={"/users/"+this.props.list._id} className="btn btn-primary">Edit</Link>
            </td>
            <td>
                <button onClick= {this.delete} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    
    );
  }
}

export default UserDetail;