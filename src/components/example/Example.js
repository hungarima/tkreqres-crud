import React, { Component } from 'react';
import axios from 'axios';
import ExampleDetail from './ExampleDetail';

class Example extends Component {
  constructor(props) {
    super(props);
    this.onChangeExample = this.onChangeExample.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      example: '',
      examples: []
    }
  }

  onChangeExample(e) {
    this.setState({
      example: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(`The values are ${this.state.example}`);
    const obj = {
      name: this.state.example
    }
    axios.post('https://tk-res.herokuapp.com/api/v1/examples', obj)
    .then(res => console.log(res.data)); 
    this.setState({
      example: ''
    });
  }

  exampleRow() {
    return this.state.examples.map(function(list, i) {
      return <ExampleDetail list ={list} index={i} />;
    })
  }



  componentDidMount() {
    axios.get('https://tk-res.herokuapp.com/api/v1/examples')
    .then(data => this.setState({examples: data.data}))
    .catch(err => console.error(err));
  }
  render() {
    return (
        <div>
            <h2>Example Component</h2>
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    {/* <th colSpan="2">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  { this.exampleRow()}
                </tbody>
              </table>
            </div>

            <h3>Add new Example</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                type="text" 
                className="form-control"
                value={this.state.example}
                onChange = {this.onChangeExample}
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Add Example"className="btn btn-primary"/>
              </div>
            </form>
        </div>
    );
  }
}

export default Example;