const Word = require('../models/Word');
const NounProjectApi = require('../services/NounProjectApi');
// import json
const healthNounData = require('../json/healthNounData.json');
const errorNounData = require('../json/errorNounData.json');
const explosionNounData = require('../json/explosionNounData.json');


class WordController {
  static show(req, res) {

    if (req.params.param === 'health') {
      console.log(`preload ${req.params.param}`);
      const words = healthNounData.map(wordData => new Word(wordData));
      res.status(200).json(words);
    }
    else if (req.params.param === 'error'){
      console.log(`preload ${req.params.param}`);
      const words = errorNounData.map(wordData => new Word(wordData));
      res.status(200).json(words);
    }
    else if (req.params.param === 'explosion'){
      console.log(`preload ${req.params.param}`);
      const words = explosionNounData.map(wordData => new Word(wordData));
      res.status(200).json(words);
    } else {



    // conditional for JSON data.
    const word = req.params.param;
    console.log('server hit');

    // Fetch definition from DictionaryAPI
    // In the then, call noun project API

    NounProjectApi.fetchIcons(req.params.param)
    .then(data => {
      const words = data.map(wordData => new Word(wordData));
      // const topTags = WordController.topTags(words);
      // res.status(200).json({ words: words, definition: definition, topTags: topTags);
      res.status(200).json(words);
    })
    // .catch(res.status(404))
    .catch(err => { res.status(404).send({ err }); })

    }

  }
  // static topTags() {
  //
  // }
}

module.exports = WordController;