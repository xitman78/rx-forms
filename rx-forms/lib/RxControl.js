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
import { Subject } from 'rxjs';
var RxControl = /** @class */ (function () {
    // private stateObserver: Observable<IControlState>;
    function RxControl(initialValue, validators) {
        if (initialValue === void 0) { initialValue = ''; }
        if (validators === void 0) { validators = []; }
        this.initialValue = initialValue;
        this.validators = validators;
        var validation = this.validateValue(initialValue);
        this.state = {
            controlName: '__undefined__',
            touched: false,
            dirty: false,
            value: initialValue,
            valid: validation.valid,
            invalid: !validation.valid,
            errorMessage: validation.errorMessage,
        };
        this.initialValue = initialValue;
        this.subject = new Subject();
        this.stateSubject = new Subject();
        /*this.observer = new Observable<IControlState>(observer => {
          this.subject.subscribe(observer);
        });
    
        this.stateObserver = new Observable<IControlState>(observer => {
          this.stateSubject.subscribe(observer);
        });*/
    }
    RxControl.prototype.setName = function (name) {
        this.state.controlName = name;
    };
    RxControl.prototype.loadValue = function (value) {
        this.initialValue = value;
        var validation = this.validateValue(value);
        this.state = {
            controlName: '__undefined__',
            touched: false,
            dirty: false,
            value: value,
            valid: validation.valid,
            invalid: !validation.valid,
            errorMessage: validation.errorMessage,
        };
        this.subject.next(this.state);
    };
    RxControl.prototype.reset = function (notifyState) {
        if (notifyState === void 0) { notifyState = true; }
        this.state.value = this.initialValue;
        this.state.dirty = false;
        var validation = this.validateValue(this.initialValue);
        this.state.valid = validation.valid;
        this.state.invalid = !validation.valid;
        this.subject.next(this.state);
        if (notifyState) {
            this.stateSubject.next(this.state);
        }
    };
    RxControl.prototype.handleInputEvent = function (value) {
        var validation = this.validateValue(value);
        var newState = __assign({ touched: true, dirty: value !== this.initialValue, controlName: this.state.controlName }, validation, { invalid: !validation.valid, value: value });
        var isStateChanged = this.isStateChanged(newState);
        this.state = newState;
        this.subject.next(newState);
        if (isStateChanged) {
            this.stateSubject.next(newState);
        }
    };
    ;
    RxControl.prototype.getState = function () {
        return this.state;
    };
    RxControl.prototype.getValue = function () {
        return this.state.value;
    };
    RxControl.prototype.subscribe = function (cb) {
        return this.subject.subscribe(cb);
    };
    RxControl.prototype.subscribeToStateChange = function (cb) {
        return this.stateSubject.subscribe(cb);
    };
    RxControl.prototype.markAsTouched = function (dontNotify) {
        var newState = __assign({}, this.state, { touched: true });
        var isStateChanged = this.isStateChanged(newState);
        this.state = newState;
        if (dontNotify) {
            return;
        }
        if (isStateChanged) {
            this.subject.next(newState);
            this.stateSubject.next(newState);
        }
    };
    RxControl.prototype.markAsDirty = function (dontNotify) {
        var newState = __assign({}, this.state, { dirty: true });
        var isStateChanged = this.isStateChanged(newState);
        this.state = newState;
        if (dontNotify) {
            return;
        }
        if (isStateChanged) {
            this.subject.next(newState);
            this.stateSubject.next(newState);
        }
    };
    RxControl.prototype.validateValue = function (value) {
        var errorMessages = this.validators ? this.validators.map(function (validator) { return validator(value); }).filter(function (error) { return !!error; }) : [];
        return {
            valid: errorMessages.length === 0,
            errorMessage: errorMessages.length > 0 ? errorMessages[0] : null
        };
    };
    RxControl.prototype.isStateChanged = function (state) {
        if (state.valid !== this.state.valid) {
            return true;
        }
        if (state.touched !== this.state.touched) {
            return true;
        }
        if (state.dirty !== this.state.dirty) {
            return true;
        }
        if (state.errorMessage !== this.state.errorMessage) {
            return true;
        }
        return false;
    };
    return RxControl;
}());
export default RxControl;
