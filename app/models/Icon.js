class Icon {
  constructor({ preview_url, uploader, date_uploaded, collections, id, tags, term }) {
    this.previewURL = preview_url;
    this.user = uploader.username;
    this.location = uploader.location;
    this.date = date_uploaded;
    this.id = id;
    // this.collection = collections[0] ? collections[0].name : undefined;
    // this.collectionID = collections[0] ? collections[0].id : undefined;
    // this.tags = tags;
    this.tags = Icon.fetchIcons(tags, term);
    this.term = term;
  }
  static fetchIcons(tags, term) {
    let cleanTags = []
    tags.forEach(tag => {
      let cleanTag = tag.slug;
      if (cleanTag.includes('-')) return;
      if (cleanTag.length > 5) return;
      if (cleanTag.length < 2) return;
      if (cleanTag === term) return;
      cleanTags.push(cleanTag);
    })
    return cleanTags
  }
}

module.exports = Icon;
