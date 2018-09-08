import * as React from 'react';

export interface IControlState {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  invalid: boolean;
  value: any;
  controlName: string | null;
  errorMessages: string[];
}

export interface IFieldInputHandlers {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

/**
 * Type for synchronous validators - if value is valid return null otherwise text string with error message
 */
export type RxValidator = (value: any) => string | null;