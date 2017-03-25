class Word {
  constructor({ preview_url, uploader, date_uploaded, collections, id, tags, term }) {
    this.previewURL = preview_url;
    this.user = uploader.username;
    this.location = uploader.location;
    this.date = date_uploaded;
    this.id = id;
    // this.collection = collections[0] ? collections[0].name : undefined;
    // this.collectionID = collections[0] ? collections[0].id : undefined;
    this.tags = tags;
    this.term = term;
  }
}

// Word rename

module.exports = Word;
