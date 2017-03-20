export default function checkValue(value, resolve, reject) {
  let currentValue = document.querySelector('.dictWrapper h1').textContent;
  const regex = /^[a-zA-Z]*$/;
  if (!regex.test(value)) {
    reject('characters a-z only');
  } else if (value.length <= 2) {
    reject('nouns and verbs work best');
  } else if (value == currentValue) {
    reject('you just searched that, try something new');
  } else {
    console.log(value);
    resolve(value);
  }
}