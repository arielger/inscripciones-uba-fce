import React, { Component } from 'react';
import { places } from '../../../config.json';
import './index.css';

const PlaceCheckboxItem = ({ place, handleChange, isActive }) =>
  <label className="filters__place">
    <div className={`filters__checkbox ${isActive ? 'active' : ''}`} />
    <input
      type="checkbox" name="place" value={place} style={{ display: 'none' }}
      checked={isActive} onChange={handleChange}
    />
    <span>{place}</span>
  </label>;

class PlacesFilter extends Component {
  constructor() {
    super();

    // Init state with all the places as active
    this.state = { places };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;

    this.setState(
      state => ({
        places: target.checked ?
          state.places.concat(target.value) :
          state.places.filter(p => (p !== target.value))
      }),
      () => {
        this.props.handleQueryChange('places', this.state.places)
      }
    );
  }
  render() {
    return (
      <div className="filters__section">
        <label className="filters__label">Sedes</label>
        {places.map(place =>
          <PlaceCheckboxItem
            key={place}
            place={place}
            handleChange={this.handleChange}
            isActive={this.state.places.includes(place)}
          />
        )}
      </div>
    );
  }
}

export default PlacesFilter;