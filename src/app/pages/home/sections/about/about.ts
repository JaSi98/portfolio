import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AVAILABILITY_ITEMS } from '../../../../core/data/availability';
import { SECTION_IDS } from '../../../../core/data/navigation';

/** About me: heading, availability facts, personal text and a link to the contact form. */
@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly sectionId = SECTION_IDS.about;
  protected readonly contactSection = SECTION_IDS.contact;
  protected readonly availability = AVAILABILITY_ITEMS;
}
