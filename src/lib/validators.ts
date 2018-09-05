import {RxValidator} from './types';

const required: RxValidator = (value: any) => {
  return value ? null : 'Required';
};

export default {
  required,
};