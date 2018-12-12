import { RxValidator, RxValidatorCreator } from './types';
import { Schema } from 'yup';
declare const _default: {
    required: RxValidatorCreator;
    yup: (yupSchema: Schema<any>) => RxValidator;
};
export default _default;
