import RxControl from './RxControl';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';
import {IControlShortState, IControlState, RxCommon} from './types';

type RxControlsMap<T> = {
  [name in keyof T]: RxControl;
};

type RxGroupsMap<T> = {
  [name in keyof T]: RxFormGroup;
};

interface IDefaultMapType {
  [name: string]: any;
}

class RxFormGroup<T = IDefaultMapType, G = IDefaultMapType> implements RxCommon {

  public controls = {} as RxControlsMap<T>;
  public groups = {} as RxGroupsMap<G>;

  private state: IControlState;

  private subject: Subject<IControlState>;
  private observer: Observable<IControlState>;


  constructor(controlsMap: RxControlsMap<T> = {} as RxControlsMap<T>, groupsMap: RxGroupsMap<G> = {} as RxGroupsMap<G>) {

    let valid = true;
    this.controls = controlsMap;
    this.groups = groupsMap;

    this.handleControlStateChange = this.handleControlStateChange.bind(this);

    Object.keys(controlsMap).forEach(controlName => {
      controlsMap[controlName].setName(controlName);
      if (!controlsMap[controlName].getState().valid) {
        valid = false;
      }
      controlsMap[controlName].subscribeToStateChange(this.handleControlStateChange);
    });


    Object.keys(groupsMap).forEach(groupName => {
      groupsMap[groupName].setName(groupName);
      if (!groupsMap[groupName].getState().valid) {
        valid = false;
      }
      groupsMap[groupName].subscribe(this.handleControlStateChange);
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

  public getState() {
    return this.state;
  }

  public getValues(): T & G {

    const controlsValues: T = Object.keys(this.controls).reduce((ac: T, key) => {ac[key] = this.controls[key].getValue(); return ac;}, {} as T);

    const groupsValues: G = Object.keys(this.groups).reduce((ac: G, key) => {ac[key] = this.groups[key].getValues(); return ac;}, {} as G);

    return Object.assign(controlsValues, groupsValues);

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