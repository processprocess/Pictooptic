import { animateInRef } from '../animations.js';

let currentValue = '';

export default function checkValue(value, resolve, reject) {
  const regex = /^[a-zA-Z]*$/;
  if (!regex.test(value)) {
    reject('characters a-z only');
  } else if (animateInRef.isActive()) {
    reject(`please wait for the current animation to complete`);
  } else if (value.length <= 2) {
    reject('nouns and verbs work best');
  } else if (value == currentValue) {
    reject(`that's your latest search, try seraching something new`);
  } else {
    currentValue = value;
    if(!resolve) return
    resolve(value);
  }
}