var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
var FormState = /** @class */ (function (_super) {
    __extends(FormState, _super);
    function FormState(props) {
        var _this = _super.call(this, props) || this;
        _this.handleStateChange = _this.handleStateChange.bind(_this);
        _this.state = props.form ? __assign({}, props.form.getState()) : {
            touched: false,
            dirty: false,
            valid: false,
            invalid: true,
            value: '',
            errorMessages: ['INVALID CONTROL'],
            controlName: '__undefined__',
        };
        if (props.form) {
            _this.subscription = props.form.subscribe(_this.handleStateChange);
        }
        return _this;
    }
    FormState.prototype.componentWillUnmount = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    FormState.prototype.handleStateChange = function (state) {
        this.setState(__assign({}, state));
    };
    FormState.prototype.render = function () {
        return (this.props.children(this.state));
    };
    return FormState;
}(React.Component));
export default FormState;
//# sourceMappingURL=FormState.js.map