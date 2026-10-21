import { Component } from '@angular/core';

import { About } from './sections/about/about';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Skills } from './sections/skills/skills';

/** One-page portfolio: hero, about, skills, projects, references and contact. */
@Component({
  selector: 'app-home',
  imports: [Hero, About, Skills, Projects],
  templateUrl: './home.html',
})
export class Home {}
