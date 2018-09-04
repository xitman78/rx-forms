// import * as React from 'react';
import {Subject} from 'rxjs';

import {RxInputEvent} from './RxForm';
import {Observable} from 'rxjs/internal/Observable';
import {IFieldState} from './Field';

class RxField {

  private value: any;
  private initialValue: any;
  private name: string;
  private touched: boolean;
  private dirty: boolean;
  private valid: boolean;
  private errorMessage: string;

  private subject: Subject<IFieldState>;
  private observer: Observable<IFieldState>;

  constructor(initValue = '') {
    /*this.name = name;
    this.type = type;*/
    this.name = '__undefined__';
    this.touched = false;
    this.dirty = false;
    this.valid = true;
    this.errorMessage = '';
    this.initialValue = initValue;
    this.value = initValue;

    this.subject = new Subject();

    this.observer = new Observable<IFieldState>(observer => {
      this.subject.subscribe(observer);
    });
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public resetValue() {
    this.value = this.initialValue;
  }

  public getValue() {
    return this.value;
  }

  public handleInputEvent(event: RxInputEvent) {
    this.value = event.value;
    // TODO: validation workflow

    const state: IFieldState = {
      touched: true,
      dirty: true,
      valid: true,
      invalid: true,
      value: this.value,
      fieldName: this.name,
      errorMessage: '',
    };

    this.subject.next(state);
  };

  public getState(): IFieldState {
    return {
      touched: this.touched,
      dirty: this.dirty,
      valid: this.valid,
      invalid: !this.valid,
      value: this.value,
      fieldName: this.name,
      errorMessage: this.errorMessage,
    };
  }

  public subscribe(cb: (state: IFieldState) => void) {
    return this.observer.subscribe(cb);
  }

}

export default RxField;
