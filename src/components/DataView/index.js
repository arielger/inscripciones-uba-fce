import React from 'react';
import _ from 'lodash';
import './index.css'

const DataView = ({ data, query }) => {
  const searchedSubjects = data
    .filter(subject => query.subjects.includes(subject.code));

  if (searchedSubjects.length === 0) {
    return (
      <div className="data-section">No hay materias seleccionadas.</div>
    );
  }

  return (
    <div className="data-section">
      { searchedSubjects.map(subject =>
        <SubjectItem key={subject.name} subject={subject} query={query} />
      )}
    </div>
  );
};

const SubjectItem = ({ subject, query }) =>
  <div className="subject">
    <h1 className="subject__title">
      <span className="subject__title__code">{subject.code}</span>
      <span className="subject__title__text">{subject.name}</span>
    </h1>
    {subject.chairs.map(chair =>
      <ChairItem key={chair.name} chair={chair} query={query} />
    )}
  </div>;

const ChairItem = ({ chair, query }) => {
  const getItemScheduleList = item =>
    item.schedule.map(sch => `${sch.day}-${sch.hour}`)

  const filteredItems = chair.places
    .filter(place => query.places.includes(place.name))
    .map(place => place.items.map(item => ({ place: place.name, ...item })))
    .reduce((acc, current) => acc.concat(current), [])
    .filter(item =>
      item.mode === "V" ||
      getItemScheduleList(item).every(i => query.schedule.includes(i))
    );

  if (filteredItems.length === 0) return null;

  return (
    <div className="chair">
      <h2 className="chair__title">
        <span className="chair__title__pre">Catedra </span>
        {chair.name}
      </h2>
      {filteredItems.map(item =>
        <Item
          key={`${item.code}-${item.mode}-${item.professor}`}
          item={item}
        />
      )}
    </div>
  );
};


const getClassFromMode = (mode) => {
  if (mode === 'R' || mode === 'R+') return 'regular';
  if (mode === 'V') return 'virtual';
  if (mode === 'D') return 'distancia';
  return '';
}

const Item = ({ item }) => {
  const scheduleByHour = _.groupBy(item.schedule, obj => obj.hour);
  const scheduleText = Object.keys(scheduleByHour)
    .map(key => {
      const days = scheduleByHour[key].map(dayObj => dayObj.day).join("/");
      const hour = key;

      return `${days} (${hour})`;
    })
    .join(" ");

  return (
    <div className="item">
      <span className="item__code">{item.code}</span>
      <span className="item__place">{item.place}</span>
      <span className="item__schedule">{scheduleText}</span>
      <span className="item__professor">{item.professor}</span>
      <span className={`item__mode ${getClassFromMode(item.mode)}`}>{item.mode}</span>
    </div>
  );
};

export default DataView;