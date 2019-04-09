import faker from 'faker';

export default {
  createRegularUser: () => {
    return {
      username: 'KniteDeveloper',
      email: faker.internet.email(),
      password: 'regularPassword'
    };
  },
  createEmptyUserField: () => {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  createEmptyUsernameField: () => {
    return {
      username: '',
      email: faker.internet.email(),
      password: 'notAnEmptyPassword'
    };
  },
  createEmptyEmailField: () => {
    return {
      username: 'notAnEmptyUsername',
      email: '',
      password: 'notAnEmptyPassword'
    };
  },
  createEmptyPasswordField: () => {
    return {
      username: 'notAnEmptyUsername',
      email: faker.internet.email(),
      password: ''
    };
  },
  createWithNoUsername: () => {
    return {
      email: faker.internet.email(),
      password: 'passwordWithNoUsername'
    };
  },
  createWithNoEmail: () => {
    return {
      username: 'usernameWithNoEmail',
      password: 'passwordWithNoEmail'
    };
  },
  createWithNoPassword: () => {
    return {
      username: 'usernameWithNoPassword',
      email: faker.internet.email()
    };
  },
  userWithInvalidUsername: () => {
    return {
      username: '123thomas',
      email: faker.internet.email(),
      password: 'invalidUsername'
    };
  },
  userWithOnlyNumsForUsername: () => {
    return {
      username: '34',
      email: faker.internet.email(),
      password: 'invalidUsername'
    };
  },
  userWithOneCharUsername: () => {
    return {
      username: 'a',
      email: faker.internet.email(),
      password: 'invalidUsername'
    };
  },
  userWithInvalidEmail: () => {
    return {
      username: 'invalidUserEmail',
      email: faker.lorem.word(),
      password: 'invalidEmailPassword'
    };
  },
  userWithInvalidPassword: () => {
    return {
      username: 'invalidPasswordUsername',
      email: faker.internet.email(),
      password: faker.address.latitude()
    };
  }
};
