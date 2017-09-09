import React, { Component } from 'react';
import Filters from '../Filters'
import DataView from '../DataView'
import data from '../../data/data.json';
import './index.css';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      query: {
        subjects: [],
        places: [],
        schedule: []
      }
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }
  handleQueryChange(key, value){
    this.setState(state => ({
      query: {
        ...state.query,
        [key]: value
      }
    })); 
  }
  render() {
    return (
      <div>
        <Filters handleQueryChange={this.handleQueryChange}/>
        <DataView data={data} query={this.state.query} />
      </div>
    );
  }
}

export default App;
