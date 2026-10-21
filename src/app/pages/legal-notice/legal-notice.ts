import { Component } from '@angular/core';

import { LEGAL_INFO } from '../../core/data/legal-info';

/** Legal notice with the provider's address and contact. */
@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.html',
})
export class LegalNotice {
  protected readonly info = LEGAL_INFO;
}
