import React, { Component } from 'react';
import Select from 'react-select';
import subjectsData from '../../data/subjects.json';
import './index.css'

const places = ['Cordoba', 'Avellaneda', 'Paternal', 'Pilar', 'San Isidro', 'Virtual'];

const getSelectSubjects = subjects =>
  subjects.map(subject => ({
    value: subject.code,
    label: `${subject.code}. ${subject.name}`
  }));

class Filters extends Component {
  constructor(props) {
    super(props);

    this.subjectsList = getSelectSubjects(subjectsData);
    this.state = {
      subjectsSelectValue: [],
      selectedPlaces: [...places]
    };

    this.handleSubjectsChange = this.handleSubjectsChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);

    this.props.handleQueryChange('places', this.state.selectedPlaces)
  }
  handleSubjectsChange(value) {
    this.setState(
      { subjectsSelectValue: value },
      () => {
        this.props.handleQueryChange(
          'subjects',
          this.state.subjectsSelectValue.map(s => s.value)
        );
      }
    );
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
    return (
      <div className="filters-sidebar">
        <div className="filters__section">
          <label className="filters__label">Materias</label>
          <Select
            value={this.state.subjectsSelectValue}
            options={this.subjectsList}
            onChange={this.handleSubjectsChange}
            multi
          />
        </div>
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
                    type="checkbox" name="place" value={place} className="filters__hidden-checkbox"
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
        </div>
      </div>
    );
  }
}

export default Filters;