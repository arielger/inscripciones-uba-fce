import React, { Component } from "react";
import { Checkbox } from "antd";
import { places } from "../../../config.json";
import "./index.css";

const CheckboxGroup = Checkbox.Group;

class PlacesFilter extends Component {
  state = { places };

  handleChange = selectedPlaces => {
    this.setState({ selectedPlaces }, () => {
      this.props.handleQueryChange("places", selectedPlaces);
    });
  };

  render() {
    return (
      <div className="filters__section places-filter">
        <label className="filters__label">Sedes</label>
        <CheckboxGroup
          options={places.map(place => ({
            label: place,
            value: place
          }))}
          defaultValue={this.state.places}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default PlacesFilter;
