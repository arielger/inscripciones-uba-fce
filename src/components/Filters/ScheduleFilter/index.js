import React from "react";
import _ from "lodash";
import { Table, Checkbox } from "antd";
import { schedule, days } from "../../../config.json";
import "./index.css";

class ScheduleFilter extends React.Component {
  constructor() {
    super();

    const daysColumnsData = days.map(day => {
      const key = day.toLowerCase();
      return {
        title: day,
        key: key,
        dataIndex: key,
        render: ({ isActive, value }) => (
          <Checkbox
            checked={isActive}
            onChange={this.handleCheckboxChange}
            value={value}
          >
            {value}
          </Checkbox>
        )
      };
    });
    this.columnsData = [
      {
        title: "Horarios",
        key: "Horarios",
        dataIndex: "hour"
      },
      ...daysColumnsData
    ];
  }

  handleCheckboxChange = event => {
    const target = event.target;
    const { selectedSchedule, handleQueryChange } = this.props;

    handleQueryChange(
      "schedule",
      target.checked
        ? selectedSchedule.concat(target.value)
        : selectedSchedule.filter(p => p !== target.value)
    );
  };

  render() {
    const { selectedSchedule } = this.props;

    // Create a row for each period of time of the day
    // with attributes for each day (lu, ma, mi, ...)
    const data = schedule.map(sch => ({
      key: sch.text,
      hour: sch.text,
      ..._.zipObject(
        days.map(d => d.toLowerCase()),
        days.map(d => {
          const value = `${d}-${sch.value}`;
          return {
            value,
            isActive: selectedSchedule.includes(value)
          };
        })
      )
    }));

    return (
      <div className="filters__section schedule-filter">
        <label className="filters__label">Días y horarios</label>
        <Table
          bordered
          size="small"
          pagination={false}
          columns={this.columnsData}
          dataSource={data}
        />
      </div>
    );
  }
}

export default ScheduleFilter;
