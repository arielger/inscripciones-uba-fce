import React from 'react';
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
      { searchedSubjects.map(subject => <SubjectItem subject={subject} query={query} />)}
      <pre>{JSON.stringify(query)}</pre>
    </div>
  );
};

const SubjectItem = ({ subject, query }) =>
  <div className="subject">
    <h1 className="subject__title">
      <span className="subject__title__code">{subject.code}</span>
      <span className="subject__title__text">{subject.name}</span>
    </h1>
    {subject.chairs.map(chair => <ChairItem chair={chair} query={query} />)}
  </div>;

const ChairItem = ({ chair, query }) =>
  <div className="chair">
    <h2 className="chair__title">
      <span className="chair__title__pre">Catedra </span>
      {chair.name}
    </h2>
    {chair.places
      .filter(place => query.places.includes(place.name))
      .map(place =>
        place.items.map(item => <Item item={item} place={place} />)
      )
    }
  </div>;

const Item = ({ item, place }) =>
  <div className="item">
    <span className="item__code">{item.code}</span>
    <span className="item__place">{place.name}</span>
    <span className="item__professor">{item.professor}</span>
    <span className="item__mode">{item.mode}</span>
  </div>;

export default DataView;