import * as React from 'react';
import RxForm from '../RxForm';

interface IProps {
  form: RxForm;
  children: (state: any) => any;
}

interface IState {

}

class Form extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.form.getObserver().subscribe(s => {
      this.forceUpdate();
    });
  }

  public render() {
    return (
      this.props.children(this.props.form)
    );
  }
}

export default Form;