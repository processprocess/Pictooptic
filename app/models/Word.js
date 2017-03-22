class Word {
  constructor({ preview_url, uploader, date_uploaded, id, tags, term } ) {
    this.previewURL = preview_url;
    this.author = uploader.name;
    this.location = uploader.location;
    this.date = date_uploaded;
    this.id = id;
    this.tags = tags;
    this.term = term;
  }
}

module.exports = Word;
