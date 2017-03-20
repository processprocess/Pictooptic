/////////// clean Dict Data ///////////

export default function cleanDictData(dictData, resolve) {
  let dictObject = {
    word: dictData.word,
    category: dictData.lexicalEntries[0].lexicalCategory,
    definition: dictData.lexicalEntries[0].entries[0].senses[0].definitions[0],
    exampleOne: dictData.lexicalEntries[0].entries[0].senses[0].examples ? dictData.lexicalEntries[0].entries[0].senses[0].examples[0].text : undefined,
    origin: dictData.lexicalEntries[0].entries[0].etymologies ? dictData.lexicalEntries[0].entries[0].etymologies[0] : undefined,
    pronunciation: dictData.lexicalEntries[0].pronunciations ? dictData.lexicalEntries[0].pronunciations[0].phoneticSpelling : undefined,
    audio: dictData.lexicalEntries[0].pronunciations ? dictData.lexicalEntries[0].pronunciations[0].audioFile : undefined,
  }
  resolve(dictObject);
}