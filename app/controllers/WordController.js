const Word = require('../models/Word');
const NounProjectApi = require('../services/NounProjectApi');
const sampleNouns = require('../json/sampleNouns.json');

const sampleLength = sampleNouns.length;

class WordController {
  static show(req, res) {
    const word = req.params.param;
    if (word === 'randomSample') {
      console.log('randomSample');
      const randomVal = Math.floor(Math.random() * ((sampleLength + 1) - 0)) + 0;
      const randomSample = sampleNouns[randomVal];
      const words = randomSample.map(wordData => new Word(wordData));
      res.status(200).json(words);
    } else {
      console.log('server hit');
      // Fetch definition from DictionaryAPI
      // In the then, call noun project API
      NounProjectApi.fetchIcons(req.params.param)
      .then(data => {
        // res.status(200).json(data); return // for debugging
        // const topTags = WordController.topTags(words); // future dev
        // res.status(200).json({ words: words, definition: definition, topTags: topTags); // future dev
        const words = data.map(wordData => new Word(wordData));
        res.status(200).json(words);
      })
      .catch(err => { res.status(404).send({ err }); })
    }

  }
  // static topTags() {
  //
  // }
}

module.exports = WordController;