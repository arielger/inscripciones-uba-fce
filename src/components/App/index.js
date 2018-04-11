import React, { Component } from "react";
import Filters from "../Filters";
import DataView from "../DataView";
import data from "../../data/data.json";
import config, { schedule, days } from "../../config.json";

const fullSchedule = schedule.reduce(
  (acc, hour) => acc.concat(days.map(day => `${day}-${hour.value}`)),
  []
);

class App extends Component {
  state = {
    query: {
      subjects: [],
      places: config.places,
      schedule: fullSchedule
    }
  };
  handleQueryChange = (key, value) => {
    this.setState(state => ({
      query: {
        ...state.query,
        [key]: value
      }
    }));
  };
  render() {
    return (
      <div>
        <Filters
          query={this.state.query}
          handleQueryChange={this.handleQueryChange}
        />
        <DataView data={data} query={this.state.query} />
      </div>
    );
  }
}

export default App;
