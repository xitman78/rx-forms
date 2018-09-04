import RxField from './RxField';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';

export interface RxInputEvent {
  value: any;
}

class RxForm {

  public controls: {
    [name: string]: RxField;
  } = {};

  private observer: Observable<RxInputEvent>;

  private subject: Subject<RxInputEvent>;


  constructor(fieldsMap: {[key: string]: RxField} = {}) {

    this.subject = new Subject();

    this.observer = new Observable<RxInputEvent>(observer => {
      this.subject.subscribe(observer);
    });

    this.controls = fieldsMap;

    Object.keys(fieldsMap).forEach(fieldName => {
      this.controls[fieldName].setName(fieldName);
    });
  }


  public getObserver() {
    return this.observer;
  }


}

export default RxForm;