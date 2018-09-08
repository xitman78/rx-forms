import RxControl from './RxControl';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';
import {IControlState} from './types';

class RxForm {

  public controls: {
    [name: string]: RxControl;
  } = {};

  public name: string;

  private subject: Subject<IControlState>;
  private observer: Observable<IControlState>;


  constructor(controlsMap: {[key: string]: RxControl} = {}) {

    this.controls = controlsMap;

    Object.keys(controlsMap).forEach(controlName => {
      this.controls[controlName].setName(controlName);
      controlsMap[controlName].subscribe(this.handleControlStateChange);
    });

    this.subject = new Subject();

    this.observer = new Observable<IControlState>(observer => {
      this.subject.subscribe(observer);
    });

  }

  public setName(name: string) {
    this.name = name;
  }

  public subscribe(cb: (state: IControlState) => void) {
    return this.observer.subscribe(cb);
  }


  private handleControlStateChange(state: IControlState) {
    console.log('handleControlStateChange', state);
  }

/*  private validateForm() {

    const valid = false;
    const dirty = false;

    Object.keys(this.controls).forEach(controlName => {
      /!*this.controls[controlName].setName(controlName);
      controlsMap[controlName].subscribe(this.handleControlStateChange);*!/
    });

  }*/


}

export default RxForm;