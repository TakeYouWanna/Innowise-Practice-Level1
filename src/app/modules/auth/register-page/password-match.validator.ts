import { AbstractControl } from '@angular/forms';

export function passwordMatch(
  control: AbstractControl
): { [key: string]: boolean } {
  const password = control.get('password');
  const passConfirm = control.get('passConfirm');

  if (!password.value || !passConfirm.value) return null;

  if (password.value === passConfirm.value) {
    return null;
  }
  return { mismatch: true };
}
