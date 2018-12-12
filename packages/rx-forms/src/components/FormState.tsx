import * as React from 'react';
import RxFormGroup from '../RxFormGroup';
import {IControlState} from '../types';
import {Subscription} from 'rxjs/internal/Subscription';

interface IProps {
  form: RxFormGroup;
  children: (state: IControlState) => any;
}

class FormState extends React.Component<IProps, IControlState> {

  private readonly subscription?: Subscription;

  constructor(props: IProps) {
    super(props);

    this.handleStateChange = this.handleStateChange.bind(this);

    this.state = props.form ? {...props.form.getState()} : {
      touched: false,
      dirty: false,
      valid: false, // TODO: remake it
      invalid: true,
      value: '',
      errorMessage: 'INVALID CONTROL',
      controlName: '__undefined__',
    };

    if (props.form) {
      this.subscription = props.form.subscribe(this.handleStateChange);
    }
  }

  public componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public handleStateChange(state: IControlState) {
    this.setState({...state});
  }


  public render() {
    return (this.props.children(this.state));
  }
}

export default FormState;
