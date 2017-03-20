/////////// clean Icon Data ///////////

export default function cleanIconData(iconData, resolve) {
  console.log();
  let cleanIconObjects = [];
  iconData.forEach((icon, i) => {
    let cleanIconObject = {
      previewURL: iconData[i].preview_url,
      author: iconData[i].uploader.name,
      location: iconData[i].uploader.location,
      date: iconData[i].date_uploaded,
      id: iconData[i].id,
      tags: iconData[i].tags,
      term: iconData[i].term
    }
    cleanIconObjects.push(cleanIconObject)
  })
  resolve(cleanIconObjects);
}