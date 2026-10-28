import { Injectable } from '@angular/core';

import { CONTACT_ENDPOINT } from '../config/contact';

/** What a visitor sends through the contact form. */
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  privacyAccepted: boolean;
  /** Hidden honeypot field; people leave it empty, bots tend to fill it in. */
  website: string;
}

/** Delivers messages of the contact form to the contact API. */
@Injectable({ providedIn: 'root' })
export class ContactService {
  /** Sends the message; rejects when the API does not accept it. */
  async send(message: ContactMessage): Promise<void> {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.toRequestBody(message)),
    });
    if (!response.ok) {
      throw new Error(`Sending failed with status ${response.status}.`);
    }
  }

  /** Maps the message to the field names of the API. */
  private toRequestBody(message: ContactMessage): Record<string, string | boolean> {
    return {
      name: message.name,
      email: message.email,
      message: message.message,
      privacy_accepted: message.privacyAccepted,
      website: message.website,
    };
  }
}
