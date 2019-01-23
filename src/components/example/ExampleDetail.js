import React, { Component } from 'react';

class ExampleDetail extends Component {
  render() {
    return (
      <tr>
          <td>{this.props.index + 1}</td>
          <td>{this.props.list.name}</td>
          {/* <td>
              <button className="btn btn-primary">Edit</button>
          </td>
          <td>
              <button className="btn btn-danger">Delete</button>
          </td> */}
      </tr>
    );
  }
}

export default ExampleDetail;