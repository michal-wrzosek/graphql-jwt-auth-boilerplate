import { ValidatorType } from 'schemat';

import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import { PASSWORD_MIN_LENGTH } from 'src/app';

export const passwordValidator: ValidatorType = password =>
  typeof passwordValidator === 'undefined'
    ? undefined
    : typeof password === 'string' &&
      password.length >= PASSWORD_MIN_LENGTH &&
      /\d/.test(password) && // at least one digit
      /^\S+$/.test(password) && // no whitespace characters
      /\W/.test(password) && // at least one special character
      /[a-z]/.test(password) && // at least one small letter
      /[A-Z]/.test(password) // at least one capital letter
    ? undefined
    : ERRORS_ENUM.VALIDATION_ERROR_INVALID_PASSWORD;
