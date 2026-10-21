import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SocialLinks } from '../../shared/components/social-links/social-links';

/** Blue footer with logo, copyright, legal links and social links. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, SocialLinks],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly year = new Date().getFullYear();
}
