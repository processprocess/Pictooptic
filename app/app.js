require('dotenv').config();
const express = require('express');
const app = express();
// const superRequest = require('superagent');
const NounProject = require('the-noun-project');
const nounProject = new NounProject({key: process.env.NOUN_KEY, secret: process.env.NOUN_SECRET});
const Dictionary = require("oxford-dictionary-api");
const dictionary = new Dictionary(process.env.OXDIC_ID, process.env.OXDIC_KEY);

const healthDictData = require('./sampleJson/healthDictData.json');
const healthNounData = require('./sampleJson/healthNounData.json');

const errorDictData = require('./sampleJson/errorDictData.json');
const errorNounData = require('./sampleJson/errorNounData.json');

const explosionDictData = require('./sampleJson/explosionDictData.json');
const explosionNounData = require('./sampleJson/explosionNounData.json');

app.get('/api:param', (request, response) => {

  const param = request.params.param;
  const returnItem = {};


  if (param === 'health') {
    console.log('preload health data');
    returnItem.dictData = healthDictData;
    returnItem.iconData = healthNounData;
    response.status(200).send({ returnItem });
  }
  else if (param === 'error'){
    console.log('preload error data');
    returnItem.dictData = errorDictData;
    returnItem.iconData = errorNounData;
    response.status(200).send({ returnItem });
  }
  else if (param === 'explosion'){
    console.log('preload explosion data');
    returnItem.dictData = explosionDictData;
    returnItem.iconData = explosionNounData;
    response.status(200).send({ returnItem });
  }

  else {
    console.log('hitting server')
    const getDictionaryData = new Promise((resolve, reject) => {
      dictionary.find(param, function (err, data) {
        if(err) { return reject(err); }
        returnItem.dictData = data;
        resolve();
      });
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
    })

    Promise.all([
      getDictionaryData,
      // getNounDataByUser,
      getNounData
    ]).then(() => { response.status(200).send({ returnItem }); })
      .catch(err => { response.status(404).send({ err }); })

  }

});

module.exports = app;