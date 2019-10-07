import { ValidatorType } from 'schemat';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';

export const stringValidator: ValidatorType = data =>
  typeof data === 'undefined'
    ? undefined
    : typeof data !== 'string'
    ? ERRORS_ENUM.VALIDATION_ERROR_NOT_A_STRING
    : undefined;
