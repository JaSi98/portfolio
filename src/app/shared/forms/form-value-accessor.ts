import { Directive, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

/**
 * Base for the custom form controls: keeps the value as signal and connects it to the
 * reactive form the control is used in.
 */
@Directive()
export abstract class FormValueAccessor<T> implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};

  /** Shows the error state; the form decides when, e.g. after a submit attempt. */
  readonly isInvalid = input<boolean>(false);

  protected abstract readonly emptyValue: T;
  protected readonly value = signal<T | null>(null);
  protected readonly isDisabled = signal<boolean>(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  /** Writes a value from the form model into the control. */
  writeValue(value: T | null): void {
    this.value.set(value ?? this.emptyValue);
  }

  /** Registers the callback that reports value changes to the form. */
  registerOnChange(onChange: (value: T) => void): void {
    this.onChange = onChange;
  }

  /** Registers the callback that reports the touched state to the form. */
  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  /** Enables or disables the control when the form control does. */
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  /** Stores a value chosen by the user and reports it to the form. */
  protected setValue(value: T): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  /** Reports to the form that the user has left the control. */
  protected markAsTouched(): void {
    this.onTouched();
  }
}
