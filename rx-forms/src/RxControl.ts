import {Subject, Subscription} from 'rxjs';

import {IControlState, RxValidator, IControlShortState, RxCommon} from './types';

interface IValidationResult {
  valid: boolean;
  errorMessage: string | null;
}

class RxControl implements RxCommon {

  private state: IControlState;

  private subject: Subject<IControlState>;

  private stateSubject: Subject<IControlState>;

  constructor(private initialValue: any = '', private validators: RxValidator[] = []) {

    const validation = this.validateValue(initialValue);

    this.state = {
      controlName:  '__undefined__',
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

  }


  public setName(name: string) {
    this.state.controlName = name;
  }

  public loadValue(value: any): void {

    this.initialValue = value;

    const validation = this.validateValue(value);

    this.state = {
      controlName:  '__undefined__',
      touched: false,
      dirty: false,
      value,
      valid: validation.valid,
      invalid: !validation.valid,
      errorMessage: validation.errorMessage,
    };

    this.subject.next(this.state);

  }

  public reset(notifyState: boolean = true): void {
    this.state.value = this.initialValue;
    this.state.dirty = false;

    const validation = this.validateValue(this.initialValue);
    this.state.valid = validation.valid;
    this.state.invalid = !validation.valid;

    this.subject.next(this.state);

    if (notifyState) {
      this.stateSubject.next(this.state);
    }

  }

  public handleInputEvent(value: any) {

    const validation = this.validateValue(value);

    const newState: IControlState = {
      touched: true,
      dirty: value !== this.initialValue,
      controlName: this.state.controlName,
      ...validation,
      invalid: !validation.valid,
      value,
    };

    const isStateChanged = this.isStateChanged(newState);

    this.state = newState;

    this.subject.next(newState);

    if (isStateChanged) {
      this.stateSubject.next(newState);
    }
  };

  public getState(): IControlState {
    return this.state;
  }

  public getValue(): any {
    return this.state.value;
  }

  public subscribe(cb: (state: IControlState) => void): Subscription {
    return this.subject.subscribe(cb);
  }

  public subscribeToStateChange(cb: (state: IControlState) => void): Subscription {
    return this.stateSubject.subscribe(cb);
  }

  public markAsTouched(dontNotify: boolean): void {
    const newState: IControlState = {
      ...this.state,
      touched: true,
    };

    const isStateChanged = this.isStateChanged(newState);

    this.state = newState;
    if (dontNotify) {
      return;
    }

    if (isStateChanged) {
      this.subject.next(newState);
      this.stateSubject.next(newState);
    }
  }

  public markAsDirty(dontNotify: boolean): void {
    const newState: IControlState = {
      ...this.state,
      dirty: true,
    };

    const isStateChanged = this.isStateChanged(newState);

    this.state = newState;
    if (dontNotify) {
      return;
    }

    if (isStateChanged) {
      this.subject.next(newState);
      this.stateSubject.next(newState);
    }
  }

  private validateValue(value: any): IValidationResult {

    const errorMessages = this.validators ? this.validators.map(validator => validator(value)).filter(error => !!error) as string[] : [];

    return {
      valid: errorMessages.length === 0,
      errorMessage: errorMessages.length > 0 ? errorMessages[0] : null
    };
  }

  private isStateChanged(state: IControlShortState): boolean {
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
  }



}

export default RxControl;
