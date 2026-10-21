import { Component } from '@angular/core';

import { SECTION_IDS } from '../../../../core/data/navigation';
import { SKILLS } from '../../../../core/data/skills';

/** Blue band with the technologies and ways of working Jan uses. */
@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly sectionId = SECTION_IDS.skills;
  protected readonly skills = SKILLS;
}
