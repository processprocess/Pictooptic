let currentValue = '';

export default function checkValue(value, resolve, reject) {
  const regex = /^[a-zA-Z]*$/;
  if (!regex.test(value)) {
    reject('characters a-z only');
  } else if (value.length <= 2) {
    reject('nouns and verbs work best');
  } else if (value == currentValue) {
    reject(`that's your latest search, try seraching something new`);
  } else {
    currentValue = value;
    resolve(value);
  }
}