import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LEGAL_INFO } from '../../core/data/legal-info';
import { SECTION_IDS } from '../../core/data/navigation';

/** Privacy policy: what data the website processes, why and which rights visitors have. */
@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy {
  protected readonly info = LEGAL_INFO;
  protected readonly contactSection = SECTION_IDS.contact;
}
