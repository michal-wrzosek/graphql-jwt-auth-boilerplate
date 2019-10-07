import { ValidatorType } from 'schemat';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';

export const requiredValidator: ValidatorType = data =>
  typeof data === 'undefined' ? ERRORS_ENUM.VALIDATION_ERROR_FIELD_REQUIRED : undefined;
