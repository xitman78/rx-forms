import * as React from 'react';
// import RxForm from './RxForm';
import RxField from './RxField';

interface IRenderProps {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  invalid: boolean;
  value: any;
  errorMassage: string;
}

export interface IFieldInputHandlers {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

interface IProps {
  control: RxField;
  children: (state: IRenderProps, handlers: IFieldInputHandlers) => any;
}

export interface IFieldState {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  invalid: boolean;
  value: any;
  fieldName: string | null;
  errorMassage: string;
}

class Field extends React.Component<IProps, IFieldState> {

  handlers: IFieldInputHandlers;

  constructor(props: any) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      touched: false,
      dirty: false,
      valid: true, // TODO: remake it
      invalid: false,
      value: props.control ? props.control.getValue() : '',
      errorMassage: '',
      fieldName: props.control ? props.control.getName() : '__undefined__',
    };

    this.handlers = {
      handleInputChange: this.handleInputChange,
    }
  }

  public handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {

    if (!this.props.control) {
      return `Control is not found in the form`;
    }

    return this.props.children(this.state, this.handlers);

  }
}

export default Field;