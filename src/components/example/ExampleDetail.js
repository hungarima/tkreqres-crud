import React, { Component } from 'react';

class ExampleDetail extends Component {
  render() {
    return (
      <tr>
          <td>{this.props.index + 1}</td>
          <td>{this.props.list.name}</td>
      </tr>
    );
  }
}

export default ExampleDetail;