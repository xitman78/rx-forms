// import * as React from 'react';
import {Subject} from 'rxjs';

import {Observable} from 'rxjs/internal/Observable';
import {IControlState, RxValidator} from './types';

class RxControl {

  private value: any;
  private initialValue: any;
  private name: string;
  private touched: boolean;
  private dirty: boolean;
  private valid: boolean;
  private errorMessages: string[];

  private subject: Subject<IControlState>;
  private observer: Observable<IControlState>;

  constructor(initValue = '', private validators: RxValidator[] = []) {
    this.name = '__undefined__';
    this.touched = false;
    this.dirty = false;
    this.valid = true;
    this.errorMessages = [];
    this.initialValue = initValue;
    this.value = initValue;

    this.subject = new Subject();

    this.observer = new Observable<IControlState>(observer => {
      this.subject.subscribe(observer);
    });
  }

  public setName(name: string) {
    this.name = name;
  }

  public resetValue() {
    this.value = this.initialValue;
    this.dirty = false;

    this.validateValue();

    const state = this.getState();

    this.subject.next(state);

  }

  public handleInputEvent(value: any) {
    this.value = value;
    this.touched = true;
    this.dirty = this.value !== this.initialValue;

    this.validateValue();

    const state = this.getState();

    this.subject.next(state);
  };


  public getState(): IControlState {

    this.validateValue();

    return {
      touched: this.touched,
      dirty: this.dirty,
      valid: this.valid,
      invalid: !this.valid,
      value: this.value,
      controlName: this.name,
      errorMessages: this.errorMessages,
    };
  }

  // can be moved to basic class
  public subscribe(cb: (state: IControlState) => void) {
    return this.observer.subscribe(cb);
  }

  private validateValue() {

    this.errorMessages = this.validators ? this.validators.map(validator => validator(this.value)).filter(error => !!error) as string[] : [];

    this.valid = this.errorMessages.length === 0;

  }

}

export default RxControl;
