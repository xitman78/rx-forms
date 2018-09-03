import * as React from 'react';
import {Subject} from 'rxjs';

import {RxInputEvent} from './RxForm';

class RxField {

  private value: any;
  private subscribers: Array<Subject<RxInputEvent>> = [];

  constructor(private name: string, private type: string, initValue = '') {
    /*this.name = name;
    this.type = type;*/
    this.value = initValue;

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  public getName() {
    return this.name;
  }

  public getType() {
    return this.type;
  }

  public getValue() {
    return this.value;
  }

  public getInputProps() {
    return {
      type: this.type,
      name: this.name,
      value: this.value,
      onChange: this.handleInputChange,
    };
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
