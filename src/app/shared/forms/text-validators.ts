import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Letters of any language, joined by spaces, hyphens, apostrophes or dots (e.g. "Jean-Luc O'Neil").
const NAME_PATTERN = /^\p{L}[\p{L}\p{M} .'’-]*$/u;
const LETTER = /\p{L}/gu;

/** Text without the spaces and line breaks around it; only spaces count as empty. */
function trimmedText(control: AbstractControl): string {
  return typeof control.value === 'string' ? control.value.trim() : '';
}

/** Requires at least `minLength` characters apart from the spaces around the text. */
export function minTrimmedLength(minLength: number): ValidatorFn {
  return (control) => {
    const length = trimmedText(control).length;
    return length >= minLength ? null : { minTrimmedLength: { minLength, actualLength: length } };
  };
}

/** Requires a name made of letters with at least `minLetters` of them, not digits or symbols. */
export function personName(minLetters: number): ValidatorFn {
  return (control): ValidationErrors | null => {
    const name = trimmedText(control);
    const letters = name.match(LETTER)?.length ?? 0;
    return NAME_PATTERN.test(name) && letters >= minLetters ? null : { personName: true };
  };
}
