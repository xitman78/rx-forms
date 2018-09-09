import * as React from 'react';
import RxFormGroup from '../RxFormGroup';

interface IProps {
  form: RxFormGroup;
  children: (state: any) => any;
}

interface IState {

}

class Form extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }


  public render() {
    return (
      this.props.children(this.props.form)
    );
  }
}

export default Form;