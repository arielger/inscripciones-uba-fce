import React, { Component } from 'react';
import { Select } from 'antd';
import subjectsData from '../../../data/data.json';

class SubjectsFilter extends Component {
  state = { subjects: [] }

  handleChange = (value) => {
    this.setState(
      { subjects: value },
      () => {
        // Update subjects key of query with the code list of selected subjects
        this.props.handleQueryChange(
          'subjects',
          this.state.subjects.map(subject => subject)
        );
      }
    );
  }
  render() {
    return (
      <div className="filters__section" ref={e => { this.container = e; }}>
        <label className="filters__label">Materias</label>
        <Select
          allowClear
          mode="multiple"
          placeholder="Materias"
          style={{ width: '100%' }}
          getPopupContainer={() => this.container}
          notFoundContent="No se ha encontrado ninguna materia"
          optionFilterProp="children"
          onChange={this.handleChange}
        >
          {subjectsData.map(subject =>
            <Select.Option
              key={subject.code}
              value={subject.code}
            >
              {subject.name} ({subject.code})
            </Select.Option>
          )}
        </Select>
      </div>
    );
  }
}

export default SubjectsFilter;