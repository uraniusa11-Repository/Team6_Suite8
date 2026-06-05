import { appConfig } from '../config/environment.config.js';
import { errorMessages } from './errorMessages.js';

export const scenarioData = {
  'Valid credentials - user logs in successfully': {
    username:        appConfig.username,
    password:        appConfig.password,
    expectedMessage: 'Home page is displayed',
    assertType:      'redirect',
  },
  'Invalid credentials - shows error alert': {
    username:        'wronguser',
    password:        'wrongpass',
    expectedMessage: errorMessages.invalidCredentials,
    assertType:      'credentialsError',
  },
  'Wrong username only - shows error alert': {
    username:        'wronguser',
    password:        appConfig.password,
    expectedMessage: errorMessages.invalidCredentials,
    assertType:      'credentialsError',
  },
  'Wrong password only - shows error alert': {
    username:        appConfig.username,
    password:        'wrongpass',
    expectedMessage: errorMessages.invalidCredentials,
    assertType:      'credentialsError',
  },
  'Both fields empty - shows validation errors on both fields': {
    username:        '',
    password:        '',
    expectedMessage: errorMessages.missingRequiredField,
    assertType:      'bothValidation',
  },
  'Empty username - shows username validation error': {
    username:        '',
    password:        appConfig.password,
    expectedMessage: errorMessages.missingRequiredField,
    assertType:      'usernameValidation',
  },
  'Empty password - shows password validation error': {
    username:        appConfig.username,
    password:        '',
    expectedMessage: errorMessages.missingRequiredField,
    assertType:      'passwordValidation',
  },

  // 'Third attempt - Show failed attempt error': {
  //   username:        appConfig.username,
  //   password:        'wrongpass',
  //   expectedMessage: errorMessages.tooManyLoginattempts,
  //   assertType:      'toomanyLoginattempts',
  // },
};
