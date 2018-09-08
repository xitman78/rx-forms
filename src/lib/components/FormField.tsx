import * as React from 'react';
import RxControl from '../RxControl';
import {Subscription} from 'rxjs/internal/Subscription';
import {IControlState, IFieldInputHandlers} from '../types';


interface IProps {
  control: RxControl;
  children: (state: IControlState, handlers: IFieldInputHandlers) => any;
}



class FormField extends React.Component<IProps, IControlState> {

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
      controlName: '__undefined__',
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

  private handleStateChange(state: IControlState) {
    this.setState({...state});
  }

  public handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.control.handleInputEvent(event.target.value);
  }

  render() {

    if (!this.props.control) {
      return `Control is not found in the form`;
    }

    return this.props.children(this.state, this.handlers);

  }
}

export default FormField;