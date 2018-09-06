// import * as React from 'react';
import {Subject} from 'rxjs';

import {RxInputEvent} from './RxForm';
import {Observable} from 'rxjs/internal/Observable';
import {IFieldState, RxValidator} from './types';

class RxField {

  private value: any;
  private initialValue: any;
  private name: string;
  private touched: boolean;
  private dirty: boolean;
  private valid: boolean;
  private errorMessages: string[];

  private subject: Subject<IFieldState>;
  private observer: Observable<IFieldState>;

  constructor(initValue = '', private validators: RxValidator[] = []) {
    /*this.name = name;
    this.type = type;*/
    this.name = '__undefined__';
    this.touched = false;
    this.dirty = false;
    this.valid = true;
    this.errorMessages = [];
    this.initialValue = initValue;
    this.value = initValue;

    this.subject = new Subject();

    this.observer = new Observable<IFieldState>(observer => {
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

  public handleInputEvent(event: RxInputEvent) {
    this.value = event.value;
    this.touched = true;
    this.dirty = this.value !== this.initialValue;

    this.validateValue();

    const state = this.getState();

    this.subject.next(state);
  };

  public getState(): IFieldState {

    this.validateValue();

    return {
      touched: this.touched,
      dirty: this.dirty,
      valid: this.valid,
      invalid: !this.valid,
      value: this.value,
      fieldName: this.name,
      errorMessages: this.errorMessages,
    };
  }

  public subscribe(cb: (state: IFieldState) => void) {
    return this.observer.subscribe(cb);
  }

  private validateValue() {

    this.errorMessages = this.validators ? this.validators.map(validator => validator(this.value)).filter(error => !!error) as string[] : [];

    this.valid = this.errorMessages.length === 0;

  }

}

export default RxField;
