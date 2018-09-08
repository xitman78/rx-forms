import {RxControl, Validators} from '../index';

it('Should create control with right state after control creation' ,() => {
  const control = new RxControl('');

  control.setName('testControl');

  const state = control.getState();

  expect(state.controlName).toBe('testControl');
  expect(state.touched).toBeFalsy();
  expect(state.dirty).toBeFalsy();
  expect(state.value).toBe('');
  expect(state.valid).toBe(true);
  expect(state.invalid).toBe(false);

});

it('Should have correct state after handling text input' ,() => {
  const control = new RxControl('');

  control.setName('testControl');

  control.handleInputEvent('abc');

  const state = control.getState();

  expect(state.touched).toBeTruthy();
  expect(state.dirty).toBeTruthy();
  expect(state.value).toBe('abc');
  expect(state.valid).toBe(true);
  expect(state.invalid).toBe(false);

});

it('should notify about state change', () => {

  const control = new RxControl('');
  control.setName('testControl');

  control.subscribe((state) => {
    expect(state.touched).toBeTruthy();
    expect(state.dirty).toBeTruthy();
    expect(state.value).toBe('abc');
    expect(state.valid).toBe(true);
    expect(state.invalid).toBe(false);
  });

  control.handleInputEvent({value: 'abc'});

});

it('should validate required field', () => {
  const control = new RxControl('', [Validators.required]);
  control.setName('testControl');

  let state = control.getState();

  expect(state.touched).toBeFalsy();
  expect(state.dirty).toBeFalsy();
  expect(state.value).toBe('');
  expect(state.valid).toBe(false);
  expect(state.invalid).toBe(true);

  control.handleInputEvent( 'abc');

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

it('should reset value to initial state', () => {
  const control = new RxControl('abc');

  control.handleInputEvent( '123');

  control.resetValue();

  const state = control.getState();

  expect(state.value).toBe('abc');
  expect(state.dirty).toBeFalsy();

});