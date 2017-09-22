import React from 'react';
import SubjectsFilter from './SubjectsFilter';
import PlacesFilter from './PlacesFilter';
import ScheduleFilter from './ScheduleFilter';
import './index.css'

const Filters = ({ query, handleQueryChange }) =>
  <div className="filters-sidebar">
    <SubjectsFilter handleQueryChange={handleQueryChange} />
    <PlacesFilter handleQueryChange={handleQueryChange} />
    <ScheduleFilter selectedSchedule={query.schedule} handleQueryChange={handleQueryChange} />
  </div>;

export default Filters;