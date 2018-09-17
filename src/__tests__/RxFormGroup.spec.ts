import {RxControl, RxFormGroup, Validators} from '../index';

it('should set name of a control equal to corresponding key in a object map passed in the constructor', () => {

  const initMap = {
    testControl: new RxControl('')
  };

  new RxFormGroup(initMap);

  expect(initMap.testControl.getState().controlName).toBe('testControl');

});


it('should notify form group when state of a control has been changed', () => {

  const initMap = {
    testControl: new RxControl('', [Validators.required])
  };

  const form = new RxFormGroup(initMap);

  form.subscribe((state) => {
    expect(state.touched).toBeTruthy();
    expect(state.dirty).toBeTruthy();
    expect(state.valid).toBeTruthy();
    expect(state.invalid).toBeFalsy();
  });

  initMap.testControl.handleInputEvent('123');
});


it('should reset values of all controls in the group with initial values', () => {

  const initMap = {
    firstName: new RxControl('john', [Validators.required]),
    lastName: new RxControl('smith', [Validators.required]),
    email: new RxControl('john@smith.com', [Validators.required]),
  };

  const form = new RxFormGroup(initMap);

  initMap.firstName.handleInputEvent('peter');
  initMap.lastName.handleInputEvent('johnson');
  initMap.email.handleInputEvent('peter@johnson.com');

  form.reset();

  expect(initMap.firstName.getState().value).toBe('john');
  expect(initMap.firstName.getState().dirty).toBeFalsy();
  expect(initMap.lastName.getState().value).toBe('smith');
  expect(initMap.lastName.getState().dirty).toBeFalsy();
  expect(initMap.email.getState().value).toBe('john@smith.com');
  expect(initMap.email.getState().dirty).toBeFalsy();

});

it('should reset receive state notification after form reset', (done) => {

  const form = new RxFormGroup({
    firstName: new RxControl('john', [Validators.required]),
    lastName: new RxControl('smith', [Validators.required]),
  });

  form.controls.firstName.handleInputEvent('some');

  form.subscribe(formState => {
    expect(formState.dirty).toBeFalsy();
    done();
  });

  form.reset(true);

});