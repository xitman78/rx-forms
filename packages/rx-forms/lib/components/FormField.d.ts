import * as React from 'react';
import RxControl from '../RxControl';
import { IControlState, IFieldInputHandlers } from '../types';
interface IProps {
    control: RxControl;
    children: (state: IControlState, handlers: IFieldInputHandlers) => any;
}
declare class FormField extends React.Component<IProps, IControlState> {
    private readonly handlers;
    private readonly subscription?;
    constructor(props: any);
    componentWillUnmount(): void;
    handleStateChange(state: IControlState): void;
    handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
    render(): any;
}
export default FormField;
