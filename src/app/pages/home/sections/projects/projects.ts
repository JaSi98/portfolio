import { Component } from '@angular/core';

import { SECTION_IDS } from '../../../../core/data/navigation';
import { PROJECTS } from '../../../../core/data/projects';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';

/** My work: one row per project, image and text alternate sides. */
@Component({
  selector: 'app-projects',
  imports: [RevealOnScroll],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly sectionId = SECTION_IDS.projects;
  protected readonly projects = PROJECTS;

  /** Names the project for screen readers; set as attribute, so it is part of the prerendered page. */
  protected liveLabel(projectName: string): string {
    return $localize`:@@projects.liveLabel:Live test: ${projectName}:INTERPOLATION:`;
  }
}
