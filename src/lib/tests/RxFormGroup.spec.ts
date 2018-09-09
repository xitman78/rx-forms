import {RxControl, RxFormGroup, Validators} from '../index';


it('should notify form group when state of a control has been changed', () => {
  const form = new RxFormGroup({
    testControl: new RxControl('', [Validators.required])
  });

  form.subscribe((state) => {
    expect(state.touched).toBeTruthy();
    expect(state.dirty).toBeTruthy();
    expect(state.valid).toBeTruthy();
    expect(state.invalid).toBeFalsy();
  });

  form.controls.testControl.handleInputEvent('123');
});