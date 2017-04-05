const Icon = require('../models/Icon');
const NounProjectApi = require('../services/NounProjectApi');
const sampleNouns = require('../json/sampleNouns.json');

const sampleLength = sampleNouns.length;

class IconController {
  static show(req, res) {
    const icon = req.params.param;
    if (icon === 'randomSample') {
      console.log('randomSample');
      const randomVal = Math.floor(Math.random() * ((sampleLength + 1) - 0)) + 0;
      const randomSample = sampleNouns[randomVal];
      const icons = randomSample.map(iconData => new Icon(iconData));
      res.status(200).json(icons);
    } else {
      console.log('server hit');
      NounProjectApi.fetchIcons(req.params.param)
      .then(data => {
        // res.status(200).json(data); return // for debugging
        // const topTags = WordController.topTags(words); // future dev
        // res.status(200).json({ words: words, definition: definition, topTags: topTags); // future dev
        const icons = data.map(iconData => new Icon(iconData));
        res.status(200).json(icons);
      })
      .catch(err => { res.status(404).send({ err }); })
    }

  }
  // static topTags() {
  //
  // }
}

module.exports = IconController;