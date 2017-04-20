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
        if(matches.length > 2) return;
        matches.push(str);
      }
    });

    cb(matches);
  };
};

$('.typeahead').typeahead({
  hint: false,
  highlight: false,
  minLength: 1,
  classNames: {
    input: 'searchInput',
    menu: 'searchMenu',
    hint: 'searchHint',
    suggestion: 'searchSuggestion'
  },
},
{
  name: 'words',
  source: substringMatcher(words)
});