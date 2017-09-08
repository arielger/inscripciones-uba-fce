import React, { Component } from 'react';
import data from '../../data/data.json';

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
      <div>
        <pre>{JSON.stringify(query)}</pre>
        {data
          .filter(subject => query.subjects.includes(subject.code))
          .map(subject =>
            <div>
              <h1>{subject.code}.{subject.name}</h1>
              {
                subject.chairs.map(chair =>
                  <div>
                    <h2>{chair.name}</h2>
                    { chair.places
                      .filter(place => query.places.includes(place.name))
                      .map(place =>
                        <div>
                          <h3>{place.name}</h3>
                          { place.items.map(item =>
                              <div>
                                <h4>Codigo: {item.code}</h4>
                                <h5>Profesor: {item.professor}</h5>
                                <h5>Mode: {item.mode}</h5>
                              </div>
                            )
                          }
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default DataView;