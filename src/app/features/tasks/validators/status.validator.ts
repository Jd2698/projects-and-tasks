import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function StatusValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validValues = ['completada', 'no completada'];

    if (control.value && !validValues.includes(control.value)) {
      return { invalidStatus: { value: control.value } };
    }
    return null;
  };
}
