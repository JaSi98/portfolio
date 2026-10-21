import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SECTION_IDS } from '../../../core/data/navigation';
import { MAIL_ICON, SOCIAL_LINKS } from '../../../core/data/social-links';

export type SocialLinksDirection = 'column' | 'row';

/** GitHub, contact and LinkedIn as round icon links. */
@Component({
  selector: 'app-social-links',
  imports: [RouterLink],
  templateUrl: './social-links.html',
  styleUrl: './social-links.scss',
  host: { '[class.social-links--row]': 'direction() === "row"' },
})
export class SocialLinks {
  readonly direction = input<SocialLinksDirection>('column');

  protected readonly github = SOCIAL_LINKS[0];
  protected readonly linkedIn = SOCIAL_LINKS[1];
  protected readonly mailIcon = MAIL_ICON;
  protected readonly contactSection = SECTION_IDS.contact;
}
