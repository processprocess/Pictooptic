require('dotenv').config();
const NounProject = require('the-noun-project');
const nounProject = new NounProject({key: process.env.NOUN_KEY, secret: process.env.NOUN_SECRET});

class NounProjectApi {
  static fetchIcons(param) {
    console.log(param);
    if (param.charAt(0) === '@') {
      param = param.slice(1)
      return new Promise((resolve, reject) => {
        nounProject.getUserUploads(param, function (err, data) {
          if(err) { return reject(err); }
          const icons = data.uploads;
          resolve(icons);
        });
      })
    // } else if (param.charAt(0) === '#') {
    //   param = param.slice(1)
    //   console.log('hitting by collection');
    //   return new Promise((resolve, reject) => {
    //     nounProject.getCollectionIconsById(param, function (err, data) {
    //       if(err) { return reject(err); }
    //       const icons = data.icons;
    //       resolve(icons);
    //     });
    //   })
    } else {
      return new Promise((resolve, reject) => {
        nounProject.getIconsByTerm(param, function (err, data) {
          if(err) { return reject(err); }
          const icons = data.icons;
          resolve(icons);
        });
      })
    }
  }
}

module.exports = NounProjectApi;


// } else if (param.charAt(0) === '#') {
  // param = param.slice(1)
  // console.log('hitting by collection');
  // return new Promise((resolve, reject) => {
  //   nounProject.getCollectionIconsById(param, function (err, data) {
  //     if(err) { return reject(err); }
  //     const icons = data.icons;
  //     resolve(icons);
  //   });
  // })