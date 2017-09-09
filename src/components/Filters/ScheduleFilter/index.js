import React, { Component } from 'react';
import { schedule, days } from '../../../config.json';
import './index.css';

const DailyCheckboxColumn = ({ day, handleChange }) =>
  <div className="filters__hours__column">
    <span className="filters__hours__day">{day}</span>
    { schedule.map(hour =>
      <label className="filters__hours__label">
        <input
          className="filters__hours__checkbox-input"
          type="checkbox" name="hour" style={{ display: 'none' }}
          value={`${day}-${hour.value}`} onChange={handleChange}
        />
        <div className="filters__hours__checkbox" />
      </label>
    )}
  </div>;

class ScheduleFilter extends Component {
  constructor() {
    super();

    this.state = { schedule: [] };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;

    this.setState(
      state => ({
        schedule: target.checked ?
          state.schedule.concat(target.value) :
          state.schedule.filter(p => (p !== target.value))
      }),
      () => {
        this.props.handleQueryChange('schedule', this.state.schedule)
      }
    );
  }
  render() {
    return (
      <div className="filters__section">
        <label className="filters__label">Días y horarios</label>
        <div className="filters__hours">
          <div className="filters__hours-column">
            { schedule.map(hour => <span className="filters__hours__item">{hour.text}</span> )}
          </div>
          {days.map(day => <DailyCheckboxColumn day={day} handleChange={this.handleChange} />)}
        </div>
      </div>
    );
  }
}

export default ScheduleFilter;