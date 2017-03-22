const Word = require('../models/Word');
const NounProjectApi = require('../services/NounProjectApi');

class WordController {
  static show(req, res) {
    NounProjectApi.fetchIcons(req.params.param)
    .then(data => {
      const words = data.map(wordData => new Word(wordData));
      res.status(200).json(words);
    });
  }
}

module.exports = WordController;