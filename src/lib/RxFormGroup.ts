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

  public reset(notifyState: boolean = true): void {
    const controlNames = Object.keys(this.controls);

    if (controlNames.length === 0) {
      return;
    }

    for(let i = 0; i < controlNames.length - 1; i++ ) {
      const controlName = controlNames[i];
      const control = this.controls[controlName];
      control.reset(false); // do not send state notification until latest control, purpose - to avoid sending state notification for each control
    }

    const lastControl = this.controls[controlNames[controlNames.length - 1]];
    if (lastControl) {
      lastControl.reset(notifyState); // send state notification for latest control if needed
    }
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

    return false;
  }


}

export default RxFormGroup;