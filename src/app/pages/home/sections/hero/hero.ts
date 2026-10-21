import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SECTION_IDS } from '../../../../core/data/navigation';
import { SocialLinks } from '../../../../shared/components/social-links/social-links';

/** First screen: greeting, job title, portrait, scroll hint and social links. */
@Component({
  selector: 'app-hero',
  imports: [RouterLink, SocialLinks],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly nextSection = SECTION_IDS.about;
}
