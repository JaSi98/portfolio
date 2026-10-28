import { Component } from '@angular/core';

import { SECTION_IDS } from '../../../../core/data/navigation';
import { SKILLS } from '../../../../core/data/skills';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';

/** Blue band with the technologies and ways of working Jan uses. */
@Component({
  selector: 'app-skills',
  imports: [RevealOnScroll],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly sectionId = SECTION_IDS.skills;
  protected readonly skills = SKILLS;
  protected readonly learningBubbleId = 'learning-topics';
}
