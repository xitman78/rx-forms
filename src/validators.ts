import {RxValidatorCreator} from './types';

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

/*const yup: RxValidator = value => {

};*/

export default {
  required,
};
