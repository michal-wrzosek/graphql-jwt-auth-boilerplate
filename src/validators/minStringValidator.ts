import { ValidatorType } from 'schemat';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';

export const minStringValidator: (min: number) => ValidatorType = min => data =>
  typeof data === 'undefined'
    ? undefined
    : typeof data === 'string' && data.length >= min
    ? undefined
    : ERRORS_ENUM.VALIDATION_ERROR_STRING_NOT_LONG_ENOUGH;
