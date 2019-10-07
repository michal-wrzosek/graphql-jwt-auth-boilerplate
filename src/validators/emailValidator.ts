import { ValidatorType } from 'schemat';

import { ERRORS_ENUM } from 'src/types/ErrorsEnum';

export const emailValidator: ValidatorType = email =>
  typeof email === 'undefined'
    ? undefined
    : typeof email === 'string' && /^\S+@\S+$/.test(email)
    ? undefined
    : ERRORS_ENUM.VALIDATION_ERROR_INVALID_EMAIL;
