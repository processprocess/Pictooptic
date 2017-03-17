const testString = 'hello from test module';
export default testString;
// default export
// import testModule from 'testModule';
// can be named anything when imported
// single usage

export const apiKey = 'abc 133';
// named export
// import { apiKey } from 'testModule';
// can be imported as name
// import { apiKey as key } from 'testModule';
// or renamed using 'as'
// must use curley brackets in import
// unlimited use.

export function sayHi(name) {
  console.log(`hello there ${name}`)
}
// named export function


const age = 70;
const dog = 'fluffer';

export { age as old, dog };
// variable renaming on export using 'as'
