import React from 'react';
import { schedule, days } from '../../../config.json';
import './index.css';

const handleCheckboxChange = (event, schedule, handleChange) => {
  const target = event.target;

  handleChange(
    'schedule',
    target.checked ?
      schedule.concat(target.value) :
      schedule.filter(p => (p !== target.value))
  );
}

const DailyCheckboxColumn = ({ day, handleChange, selectedSchedule }) =>
  <div className="filters__hours__column">
    <span className="filters__hours__day">{day}</span>
    { schedule.map(hour =>
      <label className="filters__hours__label" key={`${day}-${hour.value}`}>
        <input
          className="filters__hours__checkbox-input"
          type="checkbox"
          name="hour"
          style={{ display: 'none' }}
          value={`${day}-${hour.value}`}
          onChange={(event) => (handleCheckboxChange(event, selectedSchedule, handleChange))}
          checked={selectedSchedule.find(i => (i === `${day}-${hour.value}`)) !== undefined}
        />
        <div className="filters__hours__checkbox" />
      </label>
    )}
  </div>;

const ScheduleFilter = ({ selectedSchedule, handleQueryChange }) =>
  <div className="filters__section">
    <label className="filters__label">Días y horarios</label>
    <div className="filters__hours">
      <div className="filters__hours-column">
        {schedule.map(hour =>
          <span key={hour.text} className="filters__hours__item">{hour.text}</span>
        )}
      </div>
      {days.map(day =>
        <DailyCheckboxColumn
          key={day}
          day={day}
          handleChange={handleQueryChange}
          selectedSchedule={selectedSchedule}
        />
      )}
    </div>
  </div>;

export default ScheduleFilter;