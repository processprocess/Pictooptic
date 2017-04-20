class Icon {
  constructor({ preview_url, uploader, date_uploaded, collections, id, tags, term }) {
    this.previewURL = preview_url;
    this.user = uploader.username;
    this.location = uploader.location;
    this.date = date_uploaded;
    this.id = id;
    this.term = term.toLowerCase();
    this.tags = Icon.fetchIcons(tags, this.term);
  }
  static fetchIcons(tags, term) {
    let cleanTags = []
    tags.forEach(tag => {
      let cleanTag = tag.slug;
      if (cleanTag.includes('-')) return;
      if (cleanTag.length > 5) return;
      if (cleanTag.length < 2) return;
      if (cleanTag === term) return;
      let cleanTagCap = Icon.capitalizeFirstLetter(cleanTag);
      cleanTags.push(cleanTagCap);
    })
    return cleanTags
  }
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

module.exports = Icon;
