import * as React from 'react';
import Form from './Form';
import './App.css';

import RxForm from './RxForm';
import RxField from './RxField';

import logo from './logo.svg';


class App extends React.Component {

  private form: RxForm;

  constructor(props: any) {
    super(props);

    this.form = new RxForm([
      new RxField('firstName', 'text', 'dfgs'),
    ]);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Form form={this.form}>
          {(form: RxForm) => {
            return <React.Fragment>
            <input {...form.controls.firstName.getInputProps()} />
            </React.Fragment>;
          }}
        </Form>
      </div>
    );
  }
}

export default App;
