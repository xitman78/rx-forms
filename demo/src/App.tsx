import * as React from 'react';
// import Form from './Form';
import './App.css';

import {RxFormGroup, RxControl, FormField, IControlState, Validators, FormState} from 'rx-forms/lib';

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
      firstName: new RxControl('Alex', [Validators.required]),
      lastName: new RxControl('Cherman', [Validators.required]),
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
              {state.invalid && state.errorMessages.join(', ')}
          </label>}
        </FormField>

        <br />
        <hr />
        <FormField control={this.form.controls.lastName}>
          {(state: IControlState, {handleInputChange}) => <label>
            Last name:<input type="text" value={state.value} onChange={handleInputChange}/>
              {state.invalid && state.errorMessages.join(', ')}
          </label>}
        </FormField>

        <br />
        <hr />
        <FormState form={this.form}>
          {(state: IControlState) => <button disabled={!(state.touched && state.valid)}>Submit</button>}
        </FormState>
      </div>
    );
  }
}

export default App;
