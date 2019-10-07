import { ValidatorType } from 'schemat';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';

export const booleanValidator: ValidatorType = data =>
  typeof data === 'undefined'
    ? undefined
    : typeof data !== 'boolean'
    ? ERRORS_ENUM.VALIDATION_ERROR_NOT_A_BOOLEAN
    : undefined;
