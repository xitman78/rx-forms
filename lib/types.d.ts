import * as React from 'react';
import { Subscription } from 'rxjs/internal/Subscription';
export interface IControlShortState {
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    errorMessages: string[];
}
export interface IControlState extends IControlShortState {
    invalid: boolean;
    value: any;
    controlName: string;
}
export interface IFieldInputHandlers {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface RxCommon {
    setName: (name: string) => void;
    reset: (notifyState?: boolean) => void;
    getState: () => IControlState;
    subscribe: (cb: (state: IControlState) => void) => Subscription;
}
/**
 * Type for synchronous validators - if value is valid return null otherwise text string with error message
 */
export declare type RxValidator = (value: any) => string | null;
export declare type RxValidatorCreator = (errorMessage?: string) => RxValidator;
