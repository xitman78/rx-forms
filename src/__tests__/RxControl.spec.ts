import {RxControl, RxFormGroup, Validators} from '../index';
import * as Yup from 'yup';

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

it('should notify about state change', (done) => {

  const control = new RxControl('');
  control.setName('testControl');

  control.subscribe((state) => {
    expect(state.touched).toBeTruthy();
    expect(state.dirty).toBeTruthy();
    expect(state.value).toBe('abc');
    expect(state.valid).toBe(true);
    expect(state.invalid).toBe(false);

    done();
  });

  control.handleInputEvent('abc');

});

it('should validate required field', () => {
  const control = new RxControl('', [Validators.required('required field!')]);
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
  expect(state.errorMessages[0]).toBe('required field!');

});

it('should reset value to initial state', () => {
  const control = new RxControl('abc');

  control.handleInputEvent( '123');

  control.reset();

  const state = control.getState();

  expect(state.value).toBe('abc');
  expect(state.dirty).toBeFalsy();

});

it('should load value and set it as initial value', () => {
  const control = new RxControl('');

  control.handleInputEvent( '123');

  control.loadValue('loadedValue');

  const state = control.getState();

  expect(state.value).toBe('loadedValue');
  expect(state.touched).toBeFalsy();
  expect(state.dirty).toBeFalsy();
  expect(state.valid).toBeTruthy();
  expect(state.invalid).toBeFalsy();

});

interface ITestType {
  testControl: string
}

it('should notify form group when state of a control has been changed', (done) => {
  const form = new RxFormGroup<ITestType>({
    testControl: new RxControl(''),
  });

  form.subscribe((state) => {

    expect(state.value).toBe(null); // value in form group should be null
    expect(state.touched).toBeTruthy();
    expect(state.dirty).toBeTruthy();
    expect(state.valid).toBeTruthy();
    expect(state.invalid).toBeFalsy();

    done();

  });

  form.controls.testControl.handleInputEvent('123');

});


it('should validate value with Yup validators', () => {

  const testControl = new RxControl('', [Validators.yup(Yup.string().required('This field is required!'))]);

  expect(testControl.getState().errorMessages[0]).toBe('This field is required!');

});
