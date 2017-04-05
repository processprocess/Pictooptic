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
      const data = sampleNouns[randomVal];
      IconController.generateData(data, res)
    } else {
      console.log('server hit');
      NounProjectApi.fetchIcons(req.params.param)
      .then(data => {
        IconController.generateData(data, res)
      })
      .catch(err => { res.status(404).send({ err }); })
    }
  }

  static generateData(data, res) {
    const icons = data.map(iconData => new Icon(iconData));
    const topTags = IconController.topTags(icons); // future dev
    res.status(200).json({ icons: icons, topTags: topTags });
  }

  static topTags(icons) {
    let topTags = [];

    icons.forEach(icon => {
      let tags = icon.tags
      tags.forEach(tag => {
        topTags.push(tag)
      })
    })

    const getInstances = topTags.reduce((obj, item) => {
      if(!obj[item]) {
        obj[item] = 0
      }
      obj[item]++;
      return obj;
    }, {});

    var arrayTopTags = [];

    for (var icon in getInstances) {
        arrayTopTags.push([icon, getInstances[icon]])
    }

    arrayTopTags.sort((a, b) => {
        return b[1] - a[1];
    });

    return arrayTopTags;
    // return { topTags: topTags, getInstances: getInstances, arrayTopTags: arrayTopTags };
    // return {topTags:topTags};
  }
}

module.exports = IconController;