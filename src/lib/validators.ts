import {RxValidator} from './types';

const REQUIRED_MESSAGE = 'Required';

const required: RxValidator = (value: any) => {

  if (typeof value === 'string') {
    if (!value || !value.trim()) {
      return REQUIRED_MESSAGE;
    } else {
      return null;
    }
  }

  return (value === undefined || value === null) ? REQUIRED_MESSAGE : null;
};

export default {
  required,
};