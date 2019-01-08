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
var FormField = /** @class */ (function (_super) {
    __extends(FormField, _super);
    function FormField(props) {
        var _this = _super.call(this, props) || this;
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleStateChange = _this.handleStateChange.bind(_this);
        _this.state = props.control ? __assign({}, props.control.getState()) : {
            touched: false,
            dirty: false,
            valid: false,
            invalid: true,
            value: '',
            errorMessage: 'INVALID CONTROL',
            controlName: '__undefined__',
        };
        _this.handlers = {
            handleInputChange: _this.handleInputChange,
        };
        if (props.control) {
            _this.subscription = props.control.subscribe(_this.handleStateChange);
        }
        return _this;
    }
    FormField.prototype.componentWillUnmount = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    FormField.prototype.handleStateChange = function (state) {
        this.setState(__assign({}, state));
    };
    FormField.prototype.handleInputChange = function (event) {
        this.props.control.handleInputEvent(event.target.value);
    };
    FormField.prototype.render = function () {
        if (!this.props.control) {
            return "Control is not found in the form";
        }
        return this.props.children(this.state, this.handlers);
    };
    return FormField;
}(React.Component));
export default FormField;
