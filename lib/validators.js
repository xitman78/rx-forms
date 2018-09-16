var REQUIRED_MESSAGE = 'Required';
var required = function (value) {
    if (typeof value === 'string') {
        if (!value || !value.trim()) {
            return REQUIRED_MESSAGE;
        }
        else {
            return null;
        }
    }
    return (value === undefined || value === null) ? REQUIRED_MESSAGE : null;
};
export default {
    required: required,
};
//# sourceMappingURL=validators.js.map