import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SECTION_IDS } from '../../../../core/data/navigation';
import { ContactService } from '../../../../core/services/contact-service';
import { Checkbox } from '../../../../shared/components/checkbox/checkbox';
import { TextField } from '../../../../shared/components/text-field/text-field';
import { minTrimmedLength, personName } from '../../../../shared/forms/text-validators';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';

export type SendState = 'idle' | 'incomplete' | 'sending' | 'sent' | 'failed';

// Feedback after a click on the button disappears by itself after this time.
export const FEEDBACK_DURATION_MS = 5000;

const MESSAGE_MIN_LENGTH = 10;
const NAME_MIN_LETTERS = 2;
// Stricter than Validators.email: requires a dot in the domain, as real addresses have.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Contact section: invitation to get in touch and the form that sends a message. */
@Component({
  selector: 'app-contact',
  imports: [RevealOnScroll, ReactiveFormsModule, RouterLink, TextField, Checkbox],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly contactService = inject(ContactService);
  private feedbackTimer?: ReturnType<typeof setTimeout>;

  protected readonly sectionId = SECTION_IDS.contact;
  protected readonly sendState = signal<SendState>('idle');
  protected readonly form = inject(NonNullableFormBuilder).group({
    // Spaces alone do not count: the validators look at the text without the spaces around it.
    name: ['', [Validators.required, personName(NAME_MIN_LETTERS)]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    message: ['', [Validators.required, minTrimmedLength(MESSAGE_MIN_LENGTH)]],
    privacy: [false, Validators.requiredTrue],
    website: [''],
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.feedbackTimer));
  }

  /** Sends the message and shows whether it arrived, or what is still missing. */
  protected async submit(): Promise<void> {
    if (this.sendState() === 'sending') {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showFeedback('incomplete');
      return;
    }
    clearTimeout(this.feedbackTimer);
    this.sendState.set('sending');
    const { name, email, message, privacy, website } = this.form.getRawValue();
    try {
      await this.contactService.send({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        privacyAccepted: privacy,
        website,
      });
      this.form.reset();
      this.showFeedback('sent');
    } catch {
      this.showFeedback('failed');
    }
  }

  /** Tells whether the consent to the privacy policy is missing, which blocks sending. */
  protected isPrivacyMissing(): boolean {
    return this.form.controls.privacy.invalid;
  }

  /** Shows a feedback below the button and hides it again after a few seconds. */
  private showFeedback(state: Exclude<SendState, 'idle' | 'sending'>): void {
    clearTimeout(this.feedbackTimer);
    this.sendState.set(state);
    this.feedbackTimer = setTimeout(() => this.sendState.set('idle'), FEEDBACK_DURATION_MS);
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
