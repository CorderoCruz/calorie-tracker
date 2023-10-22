import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const isNumber = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const onlyNumbers: RegExp = /^\d+$/;
    return onlyNumbers.test(value) ? { isNumber: true } : null;
  };
};
