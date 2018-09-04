import * as React from 'react';
// import Form from './Form';
import Field, {IFieldState} from './Field';
import './App.css';

import RxForm from './RxForm';
import RxField from './RxField';

import logo from './logo.svg';


class App extends React.Component {

  private form: RxForm;

  constructor(props: any) {
    super(props);

    this.form = new RxForm({
      firstName: new RxField('Alex'),
      lastName: new RxField('Cherman'),
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
        <Field control={this.form.controls.firstName}>
          {(state: IFieldState, {handleInputChange}) => <label>First name:<input type="text" value={state.value} onChange={handleInputChange}/></label>}
        </Field>

        <br />
        <hr />
        <Field control={this.form.controls.lastName}>
          {(state: IFieldState, {handleInputChange}) => <label>Last name:<input type="text" value={state.value} onChange={handleInputChange}/></label>}
        </Field>

        <br />
        <hr />
        <Field control={this.form.controls.lastName}>
          {(state: IFieldState) => <h1>{state.value}</h1>}
        </Field>
      </div>
    );
  }
}

export default App;
