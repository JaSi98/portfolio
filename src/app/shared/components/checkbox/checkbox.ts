import { Component, input } from '@angular/core';

import { FormValueAccessor } from '../../forms/form-value-accessor';

let nextCheckboxId = 0;

/** Real checkbox behind the design's square; the label text comes from the content. */
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox extends FormValueAccessor<boolean> {
  readonly errorMessage = input<string>('');

  protected readonly emptyValue = false;
  protected readonly checkboxId = `checkbox-${nextCheckboxId++}`;

  /** Stores the new state and reports it to the form. */
  protected onToggle(event: Event): void {
    this.setValue((event.target as HTMLInputElement).checked);
  }
}
