import { Component, input, signal } from '@angular/core';

import { FormValueAccessor } from '../../forms/form-value-accessor';

export type TextFieldType = 'text' | 'email' | 'textarea';

let nextFieldId = 0;

/**
 * Input or text area with a label that moves into the border while the field is in use. The
 * error message has its own reserved line, so showing it does not move the form.
 */
@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextField extends FormValueAccessor<string> {
  readonly label = input.required<string>();
  readonly type = input<TextFieldType>('text');
  readonly autocomplete = input<string>('off');
  readonly errorMessage = input<string>('');
  readonly isValid = input<boolean>(false);
  readonly isRequired = input<boolean>(true);

  protected readonly emptyValue = '';
  protected readonly fieldId = `text-field-${nextFieldId++}`;
  protected readonly isFocused = signal<boolean>(false);

  /** Stores what the user types and reports it to the form. */
  protected onInput(event: Event): void {
    this.setValue((event.target as HTMLInputElement | HTMLTextAreaElement).value);
  }

  /** Remembers the focus, so the label stays in the border while typing. */
  protected onFocus(): void {
    this.isFocused.set(true);
  }

  /** Validation starts when the user leaves the field. */
  protected onBlur(): void {
    this.isFocused.set(false);
    this.markAsTouched();
  }
}
