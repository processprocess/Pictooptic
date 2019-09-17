const Icon = require('../models/Icon');
const NounProjectApi = require('../services/NounProjectApi');
const sampleNouns = require('../json/sampleNouns.json');
const words = require('../json/words.json');

let wordListLength = words.length;

// const sampleLength = sampleNouns.length; // for debugging

let searchParam = '';

class IconController {
  static show(req, res) {
    const icon = req.params.param;
    if (icon === 'randomSample') {
      function getWord() {
        let randomVal =
          Math.floor(Math.random() * (wordListLength + 1 - 0)) + 0; // for debugging
        let word = words[randomVal];
        searchParam = word;
        return word;
      }
      NounProjectApi.fetchIcons(getWord())
        .then(data => {
          IconController.generateData(data, res);
        })
        .catch(err => {
          res.status(404).send({ err });
        });
      // console.log('randomSample'); // for debugging
      // const randomVal = Math.floor(Math.random() * ((sampleLength + 1) - 0)) + 0; // for debugging
      // const data = sampleNouns[randomVal]; // for debugging
      // IconController.generateData(data, res); // for debugging
    } else {
      // console.log('server hit');
      searchParam = req.params.param;
      NounProjectApi.fetchIcons(req.params.param)
        .then(data => {
          IconController.generateData(data, res);
        })
        .catch(err => {
          res.status(404).send({ err });
        });
    }
  }

  static generateData(data, res) {
    const icons = data.map(iconData => new Icon(iconData));
    const topTags = IconController.topTags(icons);
    const paramCapped = IconController.capitalizeFirstLetter(searchParam);

    res
      .status(200)
      .json({ icons: icons, topTags: topTags, searchParam: paramCapped });
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static topTags(icons) {
    let topTags = [];

    icons.forEach(icon => {
      let tags = icon.tags;
      tags.forEach(tag => {
        topTags.push(tag);
      });
    });

    const getInstances = topTags.reduce((obj, item) => {
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item]++;
      return obj;
    }, {});

    var arrayTopTags = [];

    for (var icon in getInstances) {
      arrayTopTags.push([icon, getInstances[icon]]);
    }

    arrayTopTags.sort((a, b) => {
      return b[1] - a[1];
    });

    return arrayTopTags;
  }
}

module.exports = IconController;
