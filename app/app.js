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
      if(err) return console.log(err);
      returnItem.dictData = data;
      resolve();
    });
  })

  const getNounData  = new Promise((resolve, reject) => {
    nounProject.getIconsByTerm(param, function (err, data) {
      if(err) return console.log(err);
      returnItem.iconData = data.icons;
      resolve();
    });
  })

  Promise.all([ getDictionaryData, getNounData ])
         .then(() => { response.status(200).send({ returnItem }); })
});

module.exports = app;






// attribution:"Field Sobriety Test by Luis Prado from Noun Project"
// attribution_preview_url:"https://d30y9cdsu7xlg0.cloudfront.net/attribution/37852-600.png"
// collections:Array[0]
// date_uploaded:"2014-03-06"
// id:"37852"
// is_active:"1"
// is_explicit:"0"
// license_description:"creative-commons-attribution"
// nounji_free:"0"
// permalink:"/term/field-sobriety-test/37852"
// preview_url:"https://d30y9cdsu7xlg0.cloudfront.net/png/37852-200.png"
// preview_url_42:"https://d30y9cdsu7xlg0.cloudfront.net/png/37852-42.png"
// preview_url_84:"https://d30y9cdsu7xlg0.cloudfront.net/png/37852-84.png"
// sponsor:Object
// sponsor_campaign_link:null
// sponsor_id:""
// tags:Array[38]
// 0:Object
// id:26153
// slug:"field-sobriety-test"
// __proto__:Object
// 1:Object
// 2:Object
// length:38
// __proto__:Array[0]
// term:"Field Sobriety Test"
// term_id:26153
// term_slug:"field-sobriety-test"
// uploader:Object
// location:"Olympia, WA, Washington, US"
// name:"Luis Prado"
// permalink:"/Luis"
// username:"Luis"
// __proto__:Object
// uploader_id:"3490"
// year:2014