export const isEmpty = value => {
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  if (typeof value === 'object') {
    return Object.keys(value).every(key => isEmpty(value[key]));
  }
};
export const toSentenceCase = value => {
  const firstChar = value
    .slice(0, 1)
    .toUpperCase()
    .trim();
  const otherChars = value
    .slice(1)
    .toLowerCase()
    .trim();
  return `${firstChar}${otherChars}`;
};

export const uuidTester = inputUUID => {
  const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return uuidRegex.test(inputUUID);
};

export const usernameTester = inputUsername => {
  // must be at least two chars, can have an underscore in between,
  // could have other letters, if nums present, can only end with them.
  const usernameRegex = /^[A-Z]{2,}_?[A-Z]*[0-9]*$/i;
  return usernameRegex.test(inputUsername);
};

export const emailTester = inputEmail => {
  // eslint-disable-next-line no-control-regex
  const validEmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return validEmailRegex.test(inputEmail);
};
