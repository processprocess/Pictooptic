require('dotenv').config()
const express = require('express')
const app = express();
const superRequest = require('superagent');

const NounProject = require('the-noun-project')
const nounProject = new NounProject({
    key: process.env.DB_KEY,
    secret: process.env.DB_SECRET
});

app.get('/api/colors:param', (request, response) => {

  let param = request.params.param;
  // let colorUrl = `http://www.colourlovers.com/api/palettes?keywords=${param}&numResults=1&format=json`;

  let iconData;
  let returnItem = {};

  // superRequest.get(colorUrl)
  //             .then((colorResponse) => {
  //               return colorResponse.body[0] ;
  //             })
  //             .then((colorData) => {
  //               returnItem.colorData = colorData;
  //             })
  //             .then(test => {
  //               nounProject.getIconsByTerm(param, function (err, data) {
  //                 if (!err) {
  //                   returnItem.iconData = data.icons
  //                   response.status(200).send({returnItem});
  //                 }
  //               })
  //             })

  nounProject.getIconsByTerm(param, function (err, data) {
    if (!err) {
      returnItem.iconData = data.icons
      response.status(200).send({returnItem});
    }
  })

});

module.exports = app;

