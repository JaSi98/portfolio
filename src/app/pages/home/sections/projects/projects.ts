import { Component } from '@angular/core';

import { SECTION_IDS } from '../../../../core/data/navigation';
import { PROJECTS } from '../../../../core/data/projects';

/** My work: one row per project, image and text alternate sides. */
@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly sectionId = SECTION_IDS.projects;
  protected readonly projects = PROJECTS;
}
