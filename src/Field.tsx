import * as React from 'react';
// import RxForm from './RxForm';
import RxField from './RxField';
import {Subscription} from 'rxjs/internal/Subscription';

export interface IFieldInputHandlers {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

interface IProps {
  control: RxField;
  children: (state: IFieldState, handlers: IFieldInputHandlers) => any;
}

export interface IFieldState {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  invalid: boolean;
  value: any;
  fieldName: string | null;
  errorMessage: string;
}

class Field extends React.Component<IProps, IFieldState> {

  handlers: IFieldInputHandlers;
  private readonly subscription?: Subscription;

  constructor(props: any) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);

    this.state = props.control ? {...props.control.getState()} : {
      touched: false,
      dirty: false,
      valid: false, // TODO: remake it
      invalid: true,
      value: '',
      errorMessage: 'INVALID CONTROL',
      fieldName: '__undefined__',
    };

    this.handlers = {
      handleInputChange: this.handleInputChange,
    };

    if (props.control) {
      this.subscription = props.control.subscribe(this.handleStateChange);
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private handleStateChange(state: IFieldState) {
    this.setState({...state});
  }

  public handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.control.handleInputEvent({value: event.target.value})
  }

  render() {

    if (!this.props.control) {
      return `Control is not found in the form`;
    }

    return this.props.children(this.state, this.handlers);

  }
}

export default Field;