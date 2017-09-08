import React, { Component } from 'react';
import SubjectsFilter from './SubjectsFilter';
import './index.css'

const places = ['Cordoba', 'Avellaneda', 'Paternal', 'Pilar', 'San Isidro', 'Virtual'];
const hours = ['7 a 9', '9 a 11', '11 a 13', '13 a 15', '15 a 17', '17 a 19', '19 a 21', '21 a 23'];
const days = ['L', 'M', 'M', 'J', 'V', 'S'];

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlaces: [...places]
    };

    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.props.handleQueryChange('places', this.state.selectedPlaces)
  }
  handlePlaceChange(event) {
    const target = event.target;

    this.setState(
      state => ({
        selectedPlaces: target.checked ?
          state.selectedPlaces.concat(target.value) :
          state.selectedPlaces.filter(p => (p !== target.value))
      }),
      () => {
        this.props.handleQueryChange('places', this.state.selectedPlaces)
      }
    );
  }
  render() {
    const { handleQueryChange } = this.props;

    return (
      <div className="filters-sidebar">
        <SubjectsFilter handleQueryChange={handleQueryChange} />
        <div className="filters__section">
          <label className="filters__label">Sedes</label>
          {
            places.map(place =>
              <div className="filters__place">
                <label>
                  <div
                    className={`filters__checkbox ${this.state.selectedPlaces.includes(place) ? 'active' : ''}`}
                  />
                  <input
                    type="checkbox" name="place" value={place} style={{ display: 'none' }}
                    checked={this.state.selectedPlaces.includes(place)}
                    onChange={this.handlePlaceChange}
                  />
                  <span>{place}</span>
                </label>
              </div>
            )
          }
        </div>
        <div className="filters__section">
          <label className="filters__label">Días y horarios</label>
          <div className="filters__hours">
            <div className="filters__hours-column">
              {hours.map(hour =>
                <span className="filters__hours__item">{hour}</span>
              )}
            </div>
            {days.map(day =>
              <div className="filters__hours__checkbox-list">
                <span className="filters__hours__day">{day}</span>
                {hours.map(hour =>
                  <label>
                    <input className="filters__hours__checkbox-input" type="checkbox" name="hour" style={{ display: 'none' }} />
                    <div className="filters__hours__checkbox" />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;