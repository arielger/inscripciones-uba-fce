import React from 'react';
import SubjectsFilter from './SubjectsFilter';
import PlacesFilter from './PlacesFilter';
import ScheduleFilter from './ScheduleFilter';
import './index.css'

const Filters = ({ handleQueryChange }) =>
  <div className="filters-sidebar">
    <SubjectsFilter handleQueryChange={handleQueryChange} />
    <PlacesFilter handleQueryChange={handleQueryChange} />
    <ScheduleFilter handleQueryChange={handleQueryChange} />
  </div>;

export default Filters;