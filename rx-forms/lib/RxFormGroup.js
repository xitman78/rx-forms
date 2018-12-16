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
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
var RxFormGroup = /** @class */ (function () {
    function RxFormGroup(controlsMap, groupsMap) {
        if (controlsMap === void 0) { controlsMap = {}; }
        if (groupsMap === void 0) { groupsMap = {}; }
        var _this = this;
        this.controls = {};
        this.groups = {};
        var valid = true;
        this.controls = controlsMap;
        this.groups = groupsMap;
        this.handleControlStateChange = this.handleControlStateChange.bind(this);
        Object.keys(controlsMap).forEach(function (controlName) {
            controlsMap[controlName].setName(controlName);
            if (!controlsMap[controlName].getState().valid) {
                valid = false;
            }
            controlsMap[controlName].subscribeToStateChange(_this.handleControlStateChange);
        });
        Object.keys(groupsMap).forEach(function (groupName) {
            groupsMap[groupName].setName(groupName);
            if (!groupsMap[groupName].getState().valid) {
                valid = false;
            }
            groupsMap[groupName].subscribe(_this.handleControlStateChange);
        });
        this.state = {
            controlName: '__unnamed_form__',
            touched: false,
            dirty: false,
            valid: valid,
            invalid: !valid,
            value: null,
            errorMessage: null,
        };
        this.subject = new Subject();
        this.observer = new Observable(function (observer) {
            _this.subject.subscribe(observer);
        });
    }
    RxFormGroup.prototype.setName = function (name) {
        this.state.controlName = name;
    };
    RxFormGroup.prototype.subscribe = function (cb) {
        return this.observer.subscribe(cb);
    };
    RxFormGroup.prototype.reset = function (notifyState) {
        if (notifyState === void 0) { notifyState = true; }
        var controlNames = Object.keys(this.controls);
        if (controlNames.length === 0) {
            return;
        }
        for (var i = 0; i < controlNames.length - 1; i++) {
            var controlName = controlNames[i];
            var control = this.controls[controlName];
            control.reset(false); // do not send state notification until latest control, purpose - to avoid sending state notification for each control
        }
        var lastControl = this.controls[controlNames[controlNames.length - 1]];
        if (lastControl) {
            lastControl.reset(notifyState); // send state notification for latest control if needed
        }
    };
    RxFormGroup.prototype.getState = function () {
        return this.state;
    };
    RxFormGroup.prototype.getValues = function () {
        var _this = this;
        var controlsValues = Object.keys(this.controls).reduce(function (ac, key) { ac[key] = _this.controls[key].getValue(); return ac; }, {});
        var groupsValues = Object.keys(this.groups).reduce(function (ac, key) { ac[key] = _this.groups[key].getValues(); return ac; }, {});
        return Object.assign(controlsValues, groupsValues);
    };
    RxFormGroup.prototype.handleControlStateChange = function (state) {
        var _this = this;
        var control = this.controls[state.controlName];
        if (control) {
            var touched_1 = false;
            var dirty_1 = false;
            var valid_1 = true;
            Object.keys(this.controls).forEach(function (controlName) {
                var ctrl = _this.controls[controlName];
                var ctrlState = ctrl.getState();
                if (ctrlState.touched) {
                    touched_1 = true;
                }
                if (ctrlState.dirty) {
                    dirty_1 = true;
                }
                if (ctrlState.invalid) {
                    valid_1 = false;
                }
            });
            var newState = {
                touched: touched_1,
                dirty: dirty_1,
                valid: valid_1,
                errorMessage: null,
            };
            var isStateChanged = this.isStateChanged(newState);
            this.state = __assign({}, this.state, newState, { invalid: !newState.valid });
            if (isStateChanged) {
                this.subject.next(this.state);
            }
        }
    };
    RxFormGroup.prototype.isStateChanged = function (state) {
        if (state.valid !== this.state.valid) {
            return true;
        }
        if (state.touched !== this.state.touched) {
            return true;
        }
        if (state.dirty !== this.state.dirty) {
            return true;
        }
        return false;
    };
    return RxFormGroup;
}());
export default RxFormGroup;
