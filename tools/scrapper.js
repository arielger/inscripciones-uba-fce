// This file contains the node.js script that lets you update the .json file
// with the data of all the academic subjects

/* JSON Structure:
  - subject
    - chair
      - place
        - item
*/
const request = require('request');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const _ = require('lodash');
const jsonfile = require('jsonfile');
const { originDataURL, places } = require('../src/config.json');
const rowsBackgroundColor = [
  { type: "subject", color: '#666666' },
  { type: "chair", color: '#CCCCCC' }
];
const subjectCodeRegExp = /\(([^)]+)\)/;

const mapRowToObject = $ => row => {
  const backgroundColor = _.get(row, 'attribs.bgcolor');
  const rowTypeByBackgroundColor = _.get(rowsBackgroundColor.find(bg => (bg.color === backgroundColor)), 'type');
  const tdItems = $(row).find('td');
  const rowText = $(row).text().trim();

  // We can identify rows of type subject and chair by the background color of the row
  if (rowTypeByBackgroundColor === 'subject') {
    const subjectCodeMatch = subjectCodeRegExp.exec(rowText)
    const code = Number(subjectCodeMatch[1]);
    const [name, note] = rowText.split(subjectCodeMatch[0]);

    return ({
      type: 'subject',
      code,
      name: name.trim(),
      note: note.trim(),
      chairs: []
    });
  }

  if (rowTypeByBackgroundColor === 'chair') {
    const chairName = rowText.replace('Cát:', '');
    return ({
      type: 'chair',
      name: chairName,
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
    const mode = tdItems.eq(4).text().trim();
    
    const item = {
      type: 'item',
      code: Number(tdItems.eq(0).text()),
      professor: tdItems.eq(3).text().trim(),
      mode
    };

    if (mode !== 'V') {
      // Create schedule object
      const dayList = tdItems.eq(1).text().trim().split('\\');
      const hoursList = tdItems.eq(2).text().trim().split(" ");
      const normalTime = hoursList[0];
      const saturdayTime = hoursList[1] ? hoursList[1].trim().replace("Sa", "") : undefined;
      const schedule = dayList.map(day => {
        return {
          day,
          hour: (day === 'Sa' && saturdayTime) ? saturdayTime : normalTime
        };
      })

      item.schedule = schedule;
    }

    return item;
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

request({
  url: originDataURL,
  encoding: null
}, (err, response, body) => {
  var utf8String = iconv.decode(new Buffer(body), "ISO-8859-1");
  const $ = cheerio.load(utf8String);
  const rows = $('table tr');
  const result = rows
    .toArray()
    .map(mapRowToObject($))
    .filter(row => row.type !== "undefined")
    .reduce(createJSONStructure, []);

  jsonfile.writeFile('src/data/data.json', result, { spaces: 2 }, function (err) {
    console.error(err)
  })

  // Get list of subjects
  result.forEach(subject => { subject.chairs = undefined; });
  jsonfile.writeFile('src/data/subjects.json', result, { spaces: 2 }, function (err) {
    console.error(err)
  })
});
