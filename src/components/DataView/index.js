import React from "react";
import _ from "lodash";
import { Table } from "antd";
import tableColumns from "./tableColumns.json";
import "./index.css";

// Get display name for chair
const getChairPersonName = name => {
  const uppercaseWordsRegex = /\b[A-Z]{2,}\b/g;
  const uppercaseName = name.match(uppercaseWordsRegex);
  if (!uppercaseName) {
    return "-";
  }
  return _.startCase(_.toLower(uppercaseName.join(" ")));
};

const getItemScheduleList = item =>
  item.schedule.map(sch => `${sch.day}-${sch.hour}`);

// Get display text for schedule (group by schedule hours)
const getItemScheduleText = item => {
  const itemScheduleByHour = _.groupBy(item.schedule, obj => obj.hour);
  return Object.keys(itemScheduleByHour)
    .map(key => {
      const days = itemScheduleByHour[key].map(dayObj => dayObj.day).join("/");
      const hour = key;

      return `${days} (${hour})`;
    })
    .join(" ");
};

const DataView = ({ data, query }) => {
  const searchedSubjects = data.filter(subject =>
    query.subjects.includes(subject.code)
  );
  const showSubjects = searchedSubjects.length > 0;

  // @todo: Improve empty subjects list message
  return (
    <div className="data-section">
      {showSubjects
        ? searchedSubjects.map(subject => (
            <Subject key={subject.name} subject={subject} query={query} />
          ))
        : "No hay materias seleccionadas"}
    </div>
  );
};

const Subject = ({ subject, query }) => {
  // Get filtered list of items
  // @todo: Refactor filtering code using ramda
  const allItems = subject.chairs
    .map(chair =>
      chair.places
        .filter(place => query.places.includes(place.name))
        .map(place => ({ ...place, chair: chair.name }))
    )
    .reduce((acc, current) => acc.concat(current), [])
    .map(place =>
      place.items
        .filter(
          item =>
            item.mode === "V" ||
            getItemScheduleList(item).every(i => query.schedule.includes(i))
        )
        .map(item => ({
          ...item,
          chair: getChairPersonName(place.chair),
          place: place.name
        }))
    )
    .reduce((acc, current) => acc.concat(current), [])
    .map(item => {
      return {
        ...item,
        key: item.code,
        schedule: getItemScheduleText(item)
      };
    });

  return (
    <div className="subject">
      <h1 className="subject__title">
        <span className="subject__title__code">{subject.code}</span>
        <span className="subject__title__text">{subject.name}</span>
      </h1>
      <Table
        size="middle"
        columns={tableColumns}
        dataSource={allItems}
        pagination={false}
        locale={{
          emptyText:
            "No hay oferta para esta materia aplicando los filtros seleccionados"
        }}
      />
    </div>
  );
};

export default DataView;
