import { Injectable } from '@angular/core';

import { CONTACT_ENDPOINT } from '../config/contact';

/** What a visitor sends through the contact form. */
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

/** Delivers messages of the contact form to the configured endpoint. */
@Injectable({ providedIn: 'root' })
export class ContactService {
  /** Sends the message; rejects when no endpoint is set or the server reports an error. */
  async send(message: ContactMessage): Promise<void> {
    if (!CONTACT_ENDPOINT) {
      throw new Error('The contact form is not connected yet.');
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
