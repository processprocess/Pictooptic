
export default function user(name, email, website) {
  return { name, email, website }
  // return {
  //   name: name,
  //   email: email,
  //   website: website
  // }
}

export function createURL(name) {
  return `www.philip.com/users/${name}`;
}

export function avatar(email) {
  const photoURL = `www.testURL.com/${email}`;
  // return photoURL;
}