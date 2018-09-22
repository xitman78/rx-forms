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

it('should collect data from all controls and groups in a group with getValues method', () => {
  const form = new RxFormGroup({
    firstName: new RxControl('john', [Validators.required]),
    lastName: new RxControl('smith', [Validators.required]),
  }, {
    address: new RxFormGroup<{city: string, state: string, street: string}>({
      city: new RxControl(''),
      state: new RxControl(''),
      street: new RxControl(''),
    }),
  });

  form.controls.firstName.handleInputEvent('peter');
  form.controls.lastName.handleInputEvent('johnson');
  form.groups.address.controls.city.handleInputEvent('Dallas');
  form.groups.address.controls.state.handleInputEvent('Texas');
  form.groups.address.controls.street.handleInputEvent('Some street');

  const result = form.getValues();

  expect(result.firstName).toBe('peter');
  expect(result.lastName).toBe('johnson');
  expect(result.address).toBeDefined();
  expect((result.address as any).city).toBe('Dallas');
  expect((result.address as any).state).toBe('Texas');
  expect((result.address as any).street).toBe('Some street');

  console.log('result', result);

});