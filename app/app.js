require('dotenv').config();
const express = require('express');
const app = express();
// const superRequest = require('superagent');
const NounProject = require('the-noun-project');
const nounProject = new NounProject({key: process.env.NOUN_KEY, secret: process.env.NOUN_SECRET});
const Dictionary = require("oxford-dictionary-api");
const dictionary = new Dictionary(process.env.OXDIC_ID, process.env.OXDIC_KEY);

app.get('/api:param', (request, response) => {

  const param = request.params.param;
  const returnItem = {};

  const getDictionaryData = new Promise((resolve, reject) => {
    dictionary.find(param, function (err, data) {
      if(err) { return reject(err); }
      returnItem.dictData = data;
      resolve();
    });
    // reject(err)
  })

  // const getNounDataByUser = new Promise((resolve, reject) => {
  //   nounProject.getUserUploads('changhoon.baek.50', function (err, data) {
  //     if(err) reject(err);
  //     console.log(data);
  //     returnItem.iconData = data.uploads;
  //     resolve();
  //   });
  // })

  const getNounData = new Promise((resolve, reject) => {
    nounProject.getIconsByTerm(param, function (err, data) {
      if(err) { return reject(err); }
      returnItem.iconData = data.icons;
      resolve();
    });
    // reject(err)8
  })

  Promise.all([
    getDictionaryData,
    // getNounDataByUser,
    getNounData
  ])
         .then(() => { response.status(200).send({ returnItem }); })
         .catch(err => { response.status(404).send({ err }); })
});

module.exports = app;