import { words } from './words.js'
import 'typeahead.js'
import $ from "jquery";

let searchInput = document.querySelector('.searchInput')

export var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    let substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

$('.typeahead').typeahead({
  hint: true,
  highlight: false,
  // suggestion: true,
  minLength: 1,
  // menu: true,
  classNames: {
    menu: 'searchMenu',
    input: 'searchInput',
    hint: 'searchHint',
    suggestion: 'searchSuggestion'
  },
},
{
  name: 'words',
  source: substringMatcher(words)
});