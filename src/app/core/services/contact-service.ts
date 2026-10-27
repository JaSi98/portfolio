import { Injectable } from '@angular/core';

import { CONTACT_ENDPOINT } from '../config/contact';

const SIMULATED_DELAY_MS = 800;

/** What a visitor sends through the contact form. */
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

/** Delivers messages of the contact form to the configured endpoint. */
@Injectable({ providedIn: 'root' })
export class ContactService {
  /** Sends the message; rejects when the server reports an error. */
  async send(message: ContactMessage): Promise<void> {
    if (!CONTACT_ENDPOINT) {
      // No delivery set up yet: nothing leaves the browser, the form just shows its success state.
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
      return;
    }
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error(`Sending failed with status ${response.status}.`);
    }
  }
}
