import * as React from 'react';
import {Subject} from 'rxjs';

import {RxInputEvent} from './RxForm';

class RxField {

  private value: any;
  private subscribers: Array<Subject<RxInputEvent>> = [];
  private initialValue: any;
  private name: string;

  constructor(initValue = '') {
    /*this.name = name;
    this.type = type;*/
    this.name = '__undefined__';
    this.initialValue = initValue;
    this.value = initValue;

    this.handleInputChange = this.handleInputChange.bind(this);
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

 /* public getType() {
    return this.type;
  }*/

  public getValue() {
    return this.value;
  }

  private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.value = event.target.value;

    this.subscribers.forEach(subject => {
      subject.next(this.value);
    });
  }

  public subscribe(subject: Subject<RxInputEvent>) {
    this.subscribers.push(subject);
  }

 /* public subscribe() {

  }

  public unsubscribe() {

  }*/
}

export default RxField;
