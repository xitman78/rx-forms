import * as React from 'react';

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
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

/**
 * Type for synchronous validators - if value is valid return null otherwise text string with error message
 */
export type RxValidator = (value: any) => string | null;