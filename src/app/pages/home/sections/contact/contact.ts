import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SECTION_IDS } from '../../../../core/data/navigation';
import { ContactService } from '../../../../core/services/contact-service';
import { Checkbox } from '../../../../shared/components/checkbox/checkbox';
import { TextField } from '../../../../shared/components/text-field/text-field';

export type SendState = 'idle' | 'sending' | 'sent' | 'failed';

const MESSAGE_MIN_LENGTH = 10;
const NAME_MIN_LENGTH = 2;
// Stricter than Validators.email: requires a dot in the domain, as real addresses have.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Contact section: invitation to get in touch and the form that sends a message. */
@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, TextField, Checkbox],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly contactService = inject(ContactService);

  protected readonly sectionId = SECTION_IDS.contact;
  protected readonly sendState = signal<SendState>('idle');
  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(NAME_MIN_LENGTH)]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    message: ['', [Validators.required, Validators.minLength(MESSAGE_MIN_LENGTH)]],
    privacy: [false, Validators.requiredTrue],
    website: [''],
  });

  /** Sends the message and shows whether it arrived. */
  protected async submit(): Promise<void> {
    if (this.form.invalid || this.sendState() === 'sending') {
      return;
    }
    this.sendState.set('sending');
    const { name, email, message, privacy, website } = this.form.getRawValue();
    try {
      await this.contactService.send({ name, email, message, privacyAccepted: privacy, website });
      this.form.reset();
      this.sendState.set('sent');
    } catch {
      this.sendState.set('failed');
    }
  }

  /** Shows the error of a field only after the user has left it. */
  protected isInvalid(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.touched && control.invalid;
  }

  /** Shows the check mark once a touched field is filled in correctly. */
  protected isValid(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.touched && control.valid;
  }
}
