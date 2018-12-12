import * as React from 'react';
import RxFormGroup from '../RxFormGroup';
import { IControlState } from '../types';
interface IProps {
    form: RxFormGroup;
    children: (state: IControlState) => any;
}
declare class FormState extends React.Component<IProps, IControlState> {
    private readonly subscription?;
    constructor(props: IProps);
    componentWillUnmount(): void;
    handleStateChange(state: IControlState): void;
    render(): any;
}
export default FormState;
