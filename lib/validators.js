var REQUIRED_MESSAGE = 'Required';
var required = function (errorMessage) {
    if (errorMessage === void 0) { errorMessage = REQUIRED_MESSAGE; }
    return function (value) {
        if (typeof value === 'string') {
            if (!value || !value.trim()) {
                return errorMessage;
            }
            else {
                return null;
            }
        }
        return (value === undefined || value === null) ? errorMessage : null;
    };
};
var yup = function (yupSchema) {
    return function (value) {
        try {
            yupSchema.validateSync(value);
        }
        catch (validationError) {
            if (validationError.hasOwnProperty('message') && validationError.message) {
                return validationError.message;
            }
            else {
                console.log('validationError', validationError);
                return 'Unknown validation error.';
            }
        }
        return null;
    };
};
export default {
    required: required,
    yup: yup,
};
