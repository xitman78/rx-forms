import * as React from 'react';
import {Subscription} from 'rxjs/internal/Subscription';

export interface IControlShortState {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  errorMessage: string | null;
}

export interface IControlState extends IControlShortState {
  invalid: boolean;
  value: any;
  controlName: string;
}

export interface IFieldInputHandlers {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
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
export type RxValidator = (value: any) => string | null;

export type RxValidatorCreator = (errorMessage?: string) => RxValidator;
