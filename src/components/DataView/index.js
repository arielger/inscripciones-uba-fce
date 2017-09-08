import React, { Component } from 'react';
import data from '../../data/data.json';
import './index.css'

// Group 
const getItemSchedule = item => {
  if (item.mode === "V") return '';
  return item.schedule.reduce(
    (acc, current) => `${acc} ${current.day}(${current.hour})`,
    []
  );
}


class DataView extends Component {
  constructor(){
    super();

    this.state= {
      data
    };
  }
  render() {
    const { query } = this.props;

    return (
      <div className="data-section">
        {data
          .filter(subject => query.subjects.includes(subject.code))
          .map(subject =>
            <div className="subject">
              <h1 className="subject__title">
                <span className="subject__title__code">{subject.code}</span>
                <span className="subject__title__text">{subject.name}</span>
              </h1>
              {
                subject.chairs.map(chair =>
                  <div className="chair">
                    <h2 className="chair__title">
                      <span className="chair__title__pre">Catedra </span>
                      {chair.name}
                    </h2>
                    { chair.places
                      .filter(place => query.places.includes(place.name))
                      .map(place =>
                        place.items.map(item =>
                          <div className="item">
                            <span className="item__code">{item.code}</span>
                            <span className="item__place">{place.name}</span>
                            <span className="item__schedule">{getItemSchedule(item)}</span>
                            <span className="item__professor">{item.professor}</span>
                            <span className="item__mode">{item.mode}</span>
                          </div>
                        )
                      )
                    }
                  </div>
                )
              }
            </div>
          )
        }
        <pre>{JSON.stringify(query)}</pre>
      </div>
    );
  }
}

export default DataView;