import { RxControl, RxFormGroup, Validators } from '../index';
it('Should create control with right state after control creation', function () {
    var control = new RxControl('');
    control.setName('testControl');
    var state = control.getState();
    expect(state.controlName).toBe('testControl');
    expect(state.touched).toBeFalsy();
    expect(state.dirty).toBeFalsy();
    expect(state.value).toBe('');
    expect(state.valid).toBe(true);
    expect(state.invalid).toBe(false);
});
it('Should have correct state after handling text input', function () {
    var control = new RxControl('');
    control.setName('testControl');
    control.handleInputEvent('abc');
    var state = control.getState();
    expect(state.touched).toBeTruthy();
    expect(state.dirty).toBeTruthy();
    expect(state.value).toBe('abc');
    expect(state.valid).toBe(true);
    expect(state.invalid).toBe(false);
});
it('should notify about state change', function () {
    var control = new RxControl('');
    control.setName('testControl');
    control.subscribe(function (state) {
        expect(state.touched).toBeTruthy();
        expect(state.dirty).toBeTruthy();
        expect(state.value).toBe('abc');
        expect(state.valid).toBe(true);
        expect(state.invalid).toBe(false);
    });
    control.handleInputEvent('abc');
});
it('should validate required field', function () {
    var control = new RxControl('', [Validators.required]);
    control.setName('testControl');
    var state = control.getState();
    expect(state.touched).toBeFalsy();
    expect(state.dirty).toBeFalsy();
    expect(state.value).toBe('');
    expect(state.valid).toBe(false);
    expect(state.invalid).toBe(true);
    control.handleInputEvent('abc');
    state = control.getState();
    expect(state.touched).toBeTruthy();
    expect(state.dirty).toBeTruthy();
    expect(state.value).toBe('abc');
    expect(state.valid).toBe(true);
    expect(state.invalid).toBe(false);
    control.handleInputEvent(' ');
    state = control.getState();
    expect(state.touched).toBeTruthy();
    expect(state.dirty).toBeTruthy();
    expect(state.value).toBe(' ');
    expect(state.valid).toBe(false);
    expect(state.invalid).toBe(true);
});
it('should reset value to initial state', function () {
    var control = new RxControl('abc');
    control.handleInputEvent('123');
    control.reset();
    var state = control.getState();
    expect(state.value).toBe('abc');
    expect(state.dirty).toBeFalsy();
});
it('should load value and set it as initial value', function () {
    var control = new RxControl('');
    control.handleInputEvent('123');
    control.loadValue('loadedValue');
    var state = control.getState();
    expect(state.value).toBe('loadedValue');
    expect(state.touched).toBeFalsy();
    expect(state.dirty).toBeFalsy();
    expect(state.valid).toBeTruthy();
    expect(state.invalid).toBeFalsy();
});
it('should notify form group when state of a control has been changed', function () {
    var form = new RxFormGroup({
        testControl: new RxControl(''),
    });
    form.subscribe(function (state) {
        expect(state.value).toBe('123');
        expect(state.touched).toBeTruthy();
        expect(state.dirty).toBeTruthy();
        expect(state.valid).toBeTruthy();
        expect(state.invalid).toBeFalsy();
    });
    form.controls.testControl.handleInputEvent('123');
});
//# sourceMappingURL=RxControl.spec.js.map