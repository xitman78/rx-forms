import RxControl from './RxControl';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';
import {IControlShortState, IControlState} from './types';

class RxFormGroup {

  public controls: {
    [name: string]: RxControl;
  } = {};

  private state: IControlState;

  private subject: Subject<IControlState>;
  private observer: Observable<IControlState>;


  constructor(controlsMap: {[key: string]: RxControl} = {}) {

    this.controls = controlsMap;

    let valid = true;

    this.handleControlStateChange = this.handleControlStateChange.bind(this);

    Object.keys(controlsMap).forEach(controlName => {
      this.controls[controlName].setName(controlName);
      controlsMap[controlName].subscribeToStateChange(this.handleControlStateChange);
      if (!this.controls[controlName].getState().valid) {
        valid = false;
      }
    });

    this.state = {
      controlName: '__unnamed_form__',
      touched: false,
      dirty: false,
      valid,
      invalid: !valid,
      value: null,
      errorMessages: [],
    };

    this.subject = new Subject();

    this.observer = new Observable<IControlState>(observer => {
      this.subject.subscribe(observer);
    });

  }

  public setName(name: string) {
    this.state.controlName = name;
  }

  public subscribe(cb: (state: IControlState) => void) {
    return this.observer.subscribe(cb);
  }


  private handleControlStateChange(state: IControlState) {

    const control = this.controls[state.controlName];

    if (control) {

      let touched = false;
      let dirty = false;
      let valid = true;

      Object.keys(this.controls).forEach(controlName => {
        const ctrl = this.controls[controlName];
        const ctrlState = ctrl.getState();
        if (ctrlState.touched) {
          touched = true;
        }
        if (ctrlState.dirty) {
          dirty = true;
        }
        if (ctrlState.invalid) {

          valid = false;
        }
      });

      const newState: IControlShortState = {
        touched,
        dirty,
        valid,
        errorMessages: [],
      };

      const isStateChanged = this.isStateChanged(newState);

      this.state = {
        ...this.state,
        ...newState,
        invalid: !newState.valid,
      };

      if (isStateChanged) {
        this.subject.next(this.state);
      }
    }
  }

/*  private validateForm() {

    const valid = false;
    const dirty = false;

    Object.keys(this.controls).forEach(controlName => {
      /!*this.controls[controlName].setName(controlName);
      controlsMap[controlName].subscribe(this.handleControlStateChange);*!/
    });

  }*/

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
    /*if (state.errorMessages.length !== this.state.errorMessages.length) {
      return true;
    }

    if (state.errorMessages.length) {
      if (state.errorMessages.some((msg, index) => msg !== this.state.errorMessages[index])) {
        return true;
      }
    }*/

    return false;
  }


}

export default RxFormGroup;