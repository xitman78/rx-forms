import {RxValidator, RxValidatorCreator} from './types';
import {Schema, ValidationError} from 'yup';

const REQUIRED_MESSAGE = 'Required';

const required: RxValidatorCreator = (errorMessage = REQUIRED_MESSAGE) => {
  return function (value: any) {
    if (typeof value === 'string') {
      if (!value || !value.trim()) {
        return errorMessage;
      } else {
        return null;
      }
    }
    return (value === undefined || value === null) ? errorMessage : null;
  }
};

const yup = (yupSchema: Schema<any>): RxValidator => {
  return function (value: any) {
    try {
      yupSchema.validateSync(value);
    } catch(validationError) {
      if (validationError instanceof ValidationError) {
        return validationError.message;
      } else {
        return 'Unknown validation error.';
      }
    }
    return null;
  }
};

export default {
  required,
  yup,
};
