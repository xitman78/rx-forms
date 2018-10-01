import * as React from 'react';
import './App.css';
import * as Yup from 'yup';

import {
  RxFormGroup,
  RxControl,
  FormField,
  IControlState,
  Validators,
  FormState
} from 'rx-forms';

import logo from './logo.svg';

interface IUser {
  firstName: string;
  lastName: string;
}


class App extends React.Component {

  private form: RxFormGroup<IUser>;

  constructor(props: any) {
    super(props);

    this.form = new RxFormGroup<IUser>({
      firstName: new RxControl('John', [Validators.yup(Yup.string().trim().required('This fields is required'))]),
      lastName: new RxControl('Smith', [Validators.yup(Yup.string().trim().required('This fields is required'))]),
    });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br />
        <br />
        <FormField control={this.form.controls.firstName}>
          {(state: IControlState, {handleInputChange}) => <label>
            First name:<input type="text" value={state.value} onChange={handleInputChange}/>
              {state.invalid && state.errorMessage}
          </label>}
        </FormField>

        <br />
        <hr />
        <FormField control={this.form.controls.lastName}>
          {(state: IControlState, {handleInputChange}) => <label>
            Last name:<input type="text" value={state.value} onChange={handleInputChange}/>
              {state.invalid && state.errorMessage}
          </label>}
        </FormField>

        <br />
        <hr />
        <FormState form={this.form}>
          {(state: IControlState) => (
            <div>
              <button disabled={!(state.touched && state.valid)}>Submit</button>
              <br /><br />
              <div>{state.valid ? 'Form is valid' : 'Form is invalid'}</div>
              <div>{state.touched ? 'Form is touched' : 'Form is untouched'}</div>
            </div>)
          }
        </FormState>
      </div>
    );
  }
}

export default App;
