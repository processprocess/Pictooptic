const Word = require('../models/Word');
const NounProjectApi = require('../services/NounProjectApi');
// import json
const abstractNounData = require('../json/abstractNounData.json');
const astronautNounData = require('../json/astronautNounData.json');
const explosionNounData = require('../json/explosionNounData.json');
const flowerNounData = require('../json/flowerNounData.json');
const girlNounData = require('../json/girlNounData.json');
const healthNounData = require('../json/healthNounData.json');
const meltNounData = require('../json/meltNounData.json');
const patternNounData = require('../json/patternNounData.json');
const personNounData = require('../json/personNounData.json');
const smileNounData = require('../json/smileNounData.json');
const splatterNounData = require('../json/splatterNounData.json');
const tacoNounData = require('../json/tacoNounData.json');

let testParams = ['abstract', 'astronaut', 'explosion', 'flower', 'girl', 'health', 'melt', 'pattern', 'person', 'smile', 'splatter', 'taco'];

class WordController {
  static show(req, res) {

      if(testParams.includes(req.params.param)) {
        testParams.forEach(testParam => {
          if (req.params.param === testParam) {
            console.log(`preload ${testParam}`);
            const testPreload = eval(`${testParam}NounData`)
            const words = testPreload.map(wordData => new Word(wordData));
            res.status(200).json(words);
          } else { return false}
        })
      } else {
        const word = req.params.param;
        console.log('server hit');
        NounProjectApi.fetchIcons(req.params.param)
        .then(data => {
          // res.status(200).json(data); return // for debugging
          const words = data.map(wordData => new Word(wordData));
          res.status(200).json(words);
        })
        .catch(err => { res.status(404).send({ err }); })
      }









    // if (req.params.param === 'health') {
    //   console.log(`preload ${req.params.param}`);
    //   const words = healthNounData.map(wordData => new Word(wordData));
    //   res.status(200).json(words);
    // }
    // else if (req.params.param === 'error'){
    //   console.log(`preload ${req.params.param}`);
    //   const words = errorNounData.map(wordData => new Word(wordData));
    //   res.status(200).json(words);
    // }
    // else if (req.params.param === 'explosion'){
    //   console.log(`preload ${req.params.param}`);
    //   const words = explosionNounData.map(wordData => new Word(wordData));
    //   res.status(200).json(words);
    // } else {
    // // conditional for JSON data.
    // const word = req.params.param;
    // console.log('server hit');
    // // Fetch definition from DictionaryAPI
    // // In the then, call noun project API
    // NounProjectApi.fetchIcons(req.params.param)
    // .then(data => {
    //   // res.status(200).json(data); return // for debugging
    //   const words = data.map(wordData => new Word(wordData));
    //   // const topTags = WordController.topTags(words);
    //   // res.status(200).json({ words: words, definition: definition, topTags: topTags);
    //   res.status(200).json(words);
    // })
    // // .catch(res.status(404))
    // .catch(err => { res.status(404).send({ err }); })
    // }

  }
  // static topTags() {
  //
  // }
}

module.exports = WordController;