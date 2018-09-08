import RxControl from './RxControl';
// import {Observable} from 'rxjs/internal/Observable';
// import {Subject} from 'rxjs/internal/Subject';

class RxForm {

  public controls: {
    [name: string]: RxControl;
  } = {};


  constructor(fieldsMap: {[key: string]: RxControl} = {}) {

    this.controls = fieldsMap;

    Object.keys(fieldsMap).forEach(controlName => {
      this.controls[controlName].setName(controlName);
    });
  }




}

export default RxForm;