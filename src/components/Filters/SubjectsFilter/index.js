import React, { Component } from 'react';
import Select from 'react-select';
import subjectsData from '../../../data/data.json';

// Format subjects data to show in the select input
const getSelectSubjects = subjects =>
  subjects.map(subject => ({
    value: subject.code,
    label: `${subject.code}. ${subject.name}`
  }));

class SubjectsFilter extends Component {
  constructor() {
    super();
    this.subjectsList = getSelectSubjects(subjectsData);
    this.state = { subjects: [] };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState(
      { subjects: value },
      () => {
        // Update subjects key of query with the code list of selected subjects
        this.props.handleQueryChange('subjects', this.state.subjects.map(s => s.value));
      }
    );
  }
  render() {
    return (
      <div className="filters__section">
        <label className="filters__label">Materias</label>
        <Select
          value={this.state.subjects}
          options={this.subjectsList}
          onChange={this.handleChange}
          multi
        />
      </div>
    );
  }
}

export default SubjectsFilter;