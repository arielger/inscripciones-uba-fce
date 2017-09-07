// This file contains the node.js script that lets you update the .json file
// with the data of all the academic subjects

/*
  JSON Structure:

  - subject
    - chair
      - place
        - item
*/
const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');
const jsonfile = require('jsonfile');

const urlMaterias = "https://servicios.econ.uba.ar/alumnos/oferta/2017-2/OfertaCicloProf.html";
const places = ['Avellaneda', 'Paternal', 'Pilar', 'San Isidro', 'Virtual', 'Cordoba'];
const rowsBackgroundColor = [
  { type: "subject", color: '#666666' },
  { type: "chair", color: '#CCCCCC' }
];

const mapRowToObject = $ => row => {
  const backgroundColor = _.get(row, 'attribs.bgcolor');
  const rowTypeByBackgroundColor = _.get(rowsBackgroundColor.find(bg => (bg.color === backgroundColor)), 'type');
  const tdItems = $(row).find('td');
  const rowText = $(row).text().trim();

  // We can identify rows of type subject and chair by the background color of the row
  if (rowTypeByBackgroundColor === 'subject') {
    return ({
      type: 'subject',
      name: rowText,
      chairs: []
    });
  }

  if (rowTypeByBackgroundColor === 'chair') {
    return ({
      type: 'chair',
      name: rowText,
      places: []
    });
  }

  // Identify rows of type place based on the content of the only <td>
  if (places.includes(rowText)) {
    return ({
      type: 'place',
      name: rowText,
      items: []
    });
  }

  // Identify rows of type subject based on the amount of <td> items
  if (tdItems.length === 5) {
    return ({
      type: 'item',
      code: tdItems.eq(0).text(),
      day: tdItems.eq(1).text(),
      time: tdItems.eq(2).text(),
      professor: tdItems.eq(3).text(),
      mode: tdItems.eq(4).text(),
    });
  }

  return ({ type: 'undefined' });
};

const createJSONStructure = (subjects, row) => {
  const { type } = row;

  if (type === 'subject') return subjects.concat(row);

  if (type === 'chair') {
    const lastSubject = subjects[subjects.length - 1];
    lastSubject.chairs = lastSubject.chairs.concat(row);
  }

  if (type === 'place') {
    const lastSubject = subjects[subjects.length - 1];
    const lastChair = lastSubject.chairs[lastSubject.chairs.length - 1];
    lastChair.places = lastChair.places.concat(row);
  }

  if (type === 'item') {
    const lastSubject = subjects[subjects.length - 1];
    const lastChair = lastSubject.chairs[lastSubject.chairs.length - 1];
    const lastPlace = lastChair.places[lastChair.places.length - 1];
    lastPlace.items = lastPlace.items.concat(row);
  }

  return subjects;
};

const output = request(urlMaterias, (err, response, html) => {
  const $ = cheerio.load(html);
  const rows = $('table tr');
  const result = rows
    .toArray()
    .map(mapRowToObject($))
    .filter(row => row.type !== "undefined")
    .reduce(createJSONStructure, []);

  jsonfile.writeFile('./public/data.json', result, { spaces: 2 }, function (err) {
    console.error(err)
  })
});
