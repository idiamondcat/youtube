import { AbstractControl } from '@angular/forms';

export function checkRegexp(control: AbstractControl) {
  if (!control.value.match('(?=.*[A-Z])')) {
    return { errorStr: { message: 'At least one uppercase letter' } };
  }
  if (!control.value.match('(?=.*[a-z])')) {
    return { errorStr: { message: 'At least one lowercase letter' } };
  }
  if (!control.value.match('(?=.*[0-9])')) {
    return { errorStr: { message: 'At least one number' } };
  }
  if (!control.value.match('(?=.*[!@#$%^&*])')) {
    return { errorStr: { message: 'At least one special character' } };
  }
  if (!control.value.match('.{8,}')) {
    return { errorStr: { message: 'At least 8 characters long' } };
  }
  return null;
}
