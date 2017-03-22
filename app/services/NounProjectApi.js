require('dotenv').config();
const NounProject = require('the-noun-project');
const nounProject = new NounProject({key: process.env.NOUN_KEY, secret: process.env.NOUN_SECRET});

class NounProjectApi {
  static fetchIcons(param) {
    return new Promise((resolve, reject) => {
      nounProject.getIconsByTerm(param, function (err, data) {
        if(err) { return reject(err); }
        const icons = data.icons;
        resolve(icons);
      });
    })
  }
}

module.exports = NounProjectApi;