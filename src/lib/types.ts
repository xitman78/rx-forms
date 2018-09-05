import * as React from 'react';

export interface IFieldState {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  invalid: boolean;
  value: any;
  fieldName: string | null;
  errorMessage: string;
}

export interface IFieldInputHandlers {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}